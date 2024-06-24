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
	setOrgCreationModal
} from '@/store/layoutSlice';

// Define the schema using Zod
const orgSchema = z.object({
	name: z.string().min(1, 'Name is required')
});

type Schema = z.infer<typeof orgSchema>;

function OrgCreationModal() {
	const dispatch = useAppDispatch();
	const { isOrgCreationModalOpen } = useAppSelector(selectLayout);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Schema>({
		resolver: zodResolver(orgSchema)
	});

	const onSubmit = (data: Schema) => {
		console.log(data);
	};

	return (
		<Dialog
			modal={true}
			open={isOrgCreationModalOpen}
			onOpenChange={val => dispatch(setOrgCreationModal(val))}>
			<DialogContent
				onInteractOutside={e => {
					e.preventDefault();
				}}
				className='sm:max-w-[550px]'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader className='flex flex-col justify-center items-center gap-2'>
						<DialogTitle className='text-3xl text-center'>
							What's the name of your Organization?
						</DialogTitle>
						<DialogDescription>
							Create your org here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className='gap-4 grid py-4'>
						<div className='items-center gap-4 grid grid-cols-4'>
							<Label htmlFor='name' className='text-right'>
								Name
							</Label>
							<Input
								id='name'
								{...register('name')}
								className='col-span-3'
							/>
							{errors.name && (
								<p className='text-red-500'>{errors.name.message}</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button type='submit'>Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default OrgCreationModal;
