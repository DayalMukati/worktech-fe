// Import necessary libraries and components
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogFooter } from './ui/dialog';
import {
	selectLayout,
	setIsSignupModalOpen
} from '@/store/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/toolKitTyped';
import { Button } from './ui/button';

/
const stepSchemas = [
	z.object({
		firstName: z
			.string()
			.min(1,'First name is required'),
		lastName: z
			.string()
			.min(1,'Last name is required' )
	}),
	z.object({
		email: z.string().email({ message: 'Invalid email address' })
	})
];

const defaultValues = {
	firstName: '',
	lastName: '',
	address: '',
	job: ''
};
type FormData = z.infer<typeof stepSchemas>;

function MultiStepModal() {
	const { isSignupModalOpen } = useAppSelector(selectLayout);
	const dispatch = useAppDispatch();
	const [currentStep, setCurrentStep] = useState(0);
	const methods = useForm<FormData>({
		resolver: zodResolver(stepSchemas[currentStep]),
		mode: 'all'
	});

	// Update resolver when step changes
	useEffect(() => {
		// Reset form errors/state without clearing values on step change
		methods.reset({}, { keepValues: true });
	}, [currentStep, methods]);

	const nextStep = () =>
		setCurrentStep(prev =>
			Math.min(prev + 1, stepSchemas.length - 1)
		);
	const prevStep = () =>
		setCurrentStep(prev => Math.max(prev - 1, 0));

	const onSubmit = methods.handleSubmit(data => {
		console.log(data);
		// Handle form submission
	});

	return (
		<Dialog
			open={isSignupModalOpen}
			onOpenChange={val => dispatch(setIsSignupModalOpen(val))}>
			<form onSubmit={onSubmit}>
				<DialogContent>
					{currentStep === 0 && (
						<div>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								id='firstName'
								{...methods.register('firstName')}
							/>
						</div>
					)}
					{currentStep === 1 && (
						<div>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								id='lastName'
								{...methods.register('lastName')}
							/>
						</div>
					)}
					{currentStep === 2 && (
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' {...methods.register('email')} />
						</div>
					)}
					<DialogFooter>
						<Button onClick={prevStep} disabled={currentStep === 0}>
							Previous
						</Button>
						{currentStep < stepSchemas.length - 1 ? (
							<Button type='submit' onClick={nextStep}>
								Next
							</Button>
						) : (
							<Button type='submit'>Submit</Button>
						)}
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}

export default MultiStepModal;
