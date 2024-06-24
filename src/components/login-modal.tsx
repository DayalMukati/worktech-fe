'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/hooks/toolKitTyped';
import {
	selectLayout,
	setIsLoginModalOpen,
	setOrgCreationModal
} from '@/store/layoutSlice';
import { Wallet } from 'lucide-react';
import MetaMaskBtn from './metamask-btn';
import { useState } from 'react';

// Define the schema using Zod
const loginSchema = z.object({
	name: z.string().min(1, 'Name is required')
});

type Schema = z.infer<typeof loginSchema>;

// Importing a generic wallet icon, replace with MetaMask icon if available

function LoginModal() {
	// Existing code...
	const dispatch = useAppDispatch();
	const { isLoginModalOpen } = useAppSelector(selectLayout);

	const [isLoading, setIsLoading] = useState(false);

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

	const handleMetaMaskLogin = () => {
		// Logic for MetaMask login
		console.log('MetaMask login initiated');
	};

	return (
		<Dialog
			modal={true}
			open={isLoginModalOpen}
			onOpenChange={val => dispatch(setIsLoginModalOpen(val))}>
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

					{/* Existing form elements... */}

					{/* MetaMask Login Button */}
					<div className='flex justify-center my-6 w-full'>
						<MetaMaskBtn
							isLoading={isLoading}
							onClick={handleMetaMaskLogin}
						/>
					</div>

					{/* Uncommented DialogFooter for demonstration */}
					<DialogFooter>
						{/* Other buttons can be added here */}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default LoginModal;
