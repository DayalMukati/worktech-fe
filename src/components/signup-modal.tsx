// Import necessary libraries and components
import { useEffect } from 'react';
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
const skillsOptions = [
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'angular', label: 'Angular' }
];

function SignupModal() {
	const { isSignupModalOpen } = useAppSelector(selectLayout);
	const dispatch = useAppDispatch();
	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
		mode: 'all'
	});

	const onSubmit = methods.handleSubmit(
		data => {
			console.log(data);
			// Handle form submission
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
										options={skillsOptions}
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
						<Button className='w-2/3' type='submit'>
							Submit
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default SignupModal;
