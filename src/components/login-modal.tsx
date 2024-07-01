'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/hooks/toolKitTyped';
import {
	selectLayout,
	setIsLoginModalOpen,
	setIsSignupModalOpen
} from '@/store/layoutSlice';
import MetaMaskBtn from './metamask-btn';
import { useState } from 'react';
import useWeb3 from '@/hooks/useWeb3';
import { useMutation } from '@apollo/client';
import { LOGIN_USER_WITH_WALLET } from '@/graphql/mutation';
import { loadUser, setWeb3 } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/use-session';

const loginSchema = z.object({
	name: z.string().min(1, 'Name is required')
});

type Schema = z.infer<typeof loginSchema>;

function LoginModal() {
	const { connectToMetaMask, account, signMessage } = useWeb3();
	const {
		session,
		login,
		isLoading: isSessionLoading
	} = useSession();

	const router = useRouter();

	const dispatch = useAppDispatch();
	const { isLoginModalOpen } = useAppSelector(selectLayout);
	const [isLoading, setIsLoading] = useState(false);

	const [logInUser, { loading: AuthUserLoading }] = useMutation(
		LOGIN_USER_WITH_WALLET
	);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Schema>({
		resolver: zodResolver(loginSchema)
	});

	const onSubmit = (data: Schema) => {
		console.log(data);
	};

	const handleMetaMaskLogin = async () => {
		await connectToMetaMask();
		let message = 'Worktech sign in';
		let sig = await signMessage(message);
		console.log('account++++', account);

		if (!account) return;

		try {
			await logInUser({
				fetchPolicy: 'no-cache',
				variables: {
					walletAddress: account
				},
				onCompleted: async data => {
					if (data?.loginUser) {
						console.log({ session, data: data.loginUser });
						login(
							{
								_id: data.loginUser.user?._id,
								username: data.loginUser?.user?.email as string,
								walletAddress: account,
								authToken: data.loginUser.token as string
							},
							{
								optimisticData: {
									...session,
									walletAddress: account,
									authToken: data.loginUser.token as string,
									username: data.loginUser?.user?.email as string
								}
							}
						);

						if (!data.loginUser.isProfileCreated) {
							dispatch(
								setWeb3({
									walletAddress: account,
									web3: null
								})
							);

							dispatch(setIsLoginModalOpen(false));
							dispatch(setIsSignupModalOpen(true));
							localStorage.setItem('address', account);
							localStorage.setItem(
								'authToken',
								data.loginUser?.token as string
							);
						} else {
							localStorage.setItem('address', account);
							localStorage.setItem(
								'authToken',
								data.loginUser?.token as string
							);
							dispatch(
								setWeb3({
									walletAddress: account,
									web3: null
								})
							);
							router.push('/dashboard');
							// dispatch(
							// 	setWeb3({
							// 		web3: web3Instance
							// 	})
							// );
							dispatch(setIsLoginModalOpen(false));
							dispatch(setIsSignupModalOpen(false));
						}
					}
				},

				onError: error => {
					console.log('error', error.stack);
					dispatch(setIsLoginModalOpen(false));
					dispatch(setIsSignupModalOpen(false));
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleModalClose = (val: boolean) => {
		dispatch(setIsLoginModalOpen(val));
	};

	return (
		<Dialog
			modal={true}
			open={isLoginModalOpen}
			onOpenChange={handleModalClose}>
			<DialogContent
				onInteractOutside={e => {
					e.preventDefault();
				}}
				className='sm:max-w-[450px]'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader className='flex flex-col justify-center items-center gap-2'>
						<DialogTitle className='text-3xl text-center text-primary uppercase'>
							Login
						</DialogTitle>
					</DialogHeader>

					<div className='flex justify-center my-6 w-full'>
						<MetaMaskBtn
							isLoading={isLoading || isSessionLoading}
							onClick={handleMetaMaskLogin}
						/>
					</div>

					<DialogFooter></DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default LoginModal;
