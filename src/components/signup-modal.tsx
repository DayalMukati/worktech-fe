// Import necessary libraries and components
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle
} from './ui/dialog';
import { Button } from './ui/button';
import { MultiSelectComponent } from './ui/multi-select'; // Assuming this is the correct import path
import { useAppDispatch, useAppSelector } from '@/hooks/toolKitTyped';
import {
	setIsSignupModalOpen,
	selectLayout
} from '@/store/layoutSlice';
import { useMutation, useQuery } from '@apollo/client';
import {
	LOGIN_USER_WITH_WALLET,
	REGISTER_USER
} from '@/graphql/mutation';
import { handleLogin, selectUserAuth } from '@/store/authSlice';
import { LIST_ALL_SKILLS } from '@/graphql/queries';

// Define the form schema
const formSchema = z.object({
	username: z.string().min(1, 'Username is required'),
	skills: z
		.array(
			z.object({
				value: z.string(),
				label: z.string()
			})
		)
		.min(1, 'At least one skill is required')
});
type FormData = z.infer<typeof formSchema>;

// Skills options for the multi-select component

function SignupModal() {
	const [skillOptions, setSkillOptions] = useState<
		{ value: string; label: string }[]
	>([]);
	const { data, loading } = useQuery(LIST_ALL_SKILLS, {
		onCompleted: data => {
			const options = data.listAllSkills.map(skill => ({
				value: skill._id,
				label: skill.title
			}));
			setSkillOptions(options);
		}
	});
	const [updateUserProfile, { loading: updatedLoading }] =
		useMutation(REGISTER_USER);

	const { isSignupModalOpen } = useAppSelector(selectLayout);
	const dispatch = useAppDispatch();
	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
		mode: 'all'
	});
	const { user } = useAppSelector(selectUserAuth);

	const onSubmit = methods.handleSubmit(
		async data => {
			if (typeof user?.walletAddress === 'undefined') {
				// Handle the undefined case, maybe show an error or use a default value
				console.log('Wallet address is undefined');
			} else {
				await updateUserProfile({
					variables: {
						input: {
							email: data.username,
							skills: data.skills.map(skill => skill.value),
							status: 0,
							walletAddress: user.walletAddress
						}
					},
					onCompleted: data => {
						localStorage.setItem(
							'authToken',
							data.registerUser.token as string
						);
					}
				});

				// Close the modal
				dispatch(setIsSignupModalOpen(false));
			}
		},
		e => {
			console.log(e);
		}
	);

	return (
		<Dialog
			open={isSignupModalOpen}
			onOpenChange={val => dispatch(setIsSignupModalOpen(val))}>
			<DialogContent>
				<DialogTitle>
					<h2 className='font-bold text-2xl text-primary'>Sign Up</h2>
				</DialogTitle>
				<form onSubmit={onSubmit}>
					<div>
						<Label htmlFor='username'>User Name</Label>
						<Input id='username' {...methods.register('username')} />
						{methods.formState.errors.username && (
							<p className='text-red-500 text-sm'>
								*{methods.formState.errors.username.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='skills'>Skills</Label>
						<Controller
							name='skills'
							control={methods.control}
							render={({ field, fieldState: { error } }) => (
								<>
									<MultiSelectComponent
										createAble={true}
										isMulti={true}
										options={skillOptions}
										{...field}
										placeholder='Select Skills'
									/>
									{error && (
										<p className='text-red-500 text-sm'>
											*{error.message}
										</p>
									)}
								</>
							)}
						/>
					</div>
					<div className='flex justify-center mt-2.5 w-full'>
						<Button
							loading={updatedLoading}
							className='w-2/3'
							type='submit'>
							Submit
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default SignupModal;
