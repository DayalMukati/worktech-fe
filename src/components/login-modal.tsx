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
import useMetamask from '@/hooks/useMetamask';
import { useMutation } from '@apollo/client';
import { LOGIN_USER_WITH_WALLET } from '@/graphql/mutation';
import { loadUser, setWeb3 } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
	name: z.string().min(1, 'Name is required')
});

type Schema = z.infer<typeof loginSchema>;

function LoginModal() {
	const router = useRouter();

	const { connectToMetamask, account, signedMessage, error, web3 } =
		useMetamask();
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
		console.log('MetaMask login initiated');
		const { account, signedMessage, web3Instance } =
			await connectToMetamask();
		console.log('account:', account, { web3Instance });
		console.log('signedMessage:', signedMessage);
		if (!account || !signedMessage) return;

		try {
			await logInUser({
				fetchPolicy: 'no-cache',
				variables: {
					walletAddress: account
				},
				onCompleted: data => {
					if (data?.loginUser) {
						if (!data.loginUser.isProfileCreated) {
							dispatch(
								setWeb3({
									walletAddress: account,
									web3: web3Instance
								})
							);
							dispatch(setIsLoginModalOpen(false));
							dispatch(setIsSignupModalOpen(true));
						} else {
							localStorage.setItem('address', account);
							localStorage.setItem(
								'authToken',
								data.loginUser?.token as string
							);
							dispatch(
								setWeb3({
									walletAddress: account
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
							isLoading={isLoading}
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
