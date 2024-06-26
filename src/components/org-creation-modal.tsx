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
import { Building2 } from 'lucide-react';
import { createOrg } from '@/store/orgSlice';
import { useMutation } from '@apollo/client';
import { CREATE_ORG_MUTATION } from '@/graphql/mutation';
import { Orgs } from '@/graphql/__generated__/graphql';

// Define the schema using Zod
const orgSchema = z.object({
	name: z.string().min(1, 'Name is required')
});

type Schema = z.infer<typeof orgSchema>;

function OrgCreationModal() {
	const dispatch = useAppDispatch();
	const { isOrgCreationModalOpen } = useAppSelector(selectLayout);

	const [createOrgMutation, { loading: isOrgCreating }] = useMutation(
		CREATE_ORG_MUTATION
	);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Schema>({
		resolver: zodResolver(orgSchema)
	});

	const onSubmit = async (data: Schema) => {
		await createOrgMutation({
			variables: {
				input: {
					name: data.name,
					status: 1
				}
			},
			onCompleted: data => {
				dispatch(createOrg(data.createOrg as Orgs));
			}
		});
		dispatch(setOrgCreationModal(false));
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
					</DialogHeader>
					<div className='gap-4 grid py-4'>
						<div className='flex flex-col justify-center items-center gap-4 grid-cols-4'>
							<Label htmlFor='name' className='sr-only'>
								Name
							</Label>
							<div className='bg-primary p-3 rounded-full'>
								<Building2 className='w-10 h-10 text-primary-foreground' />
							</div>
							<Input
								id='name'
								{...register('name')}
								placeholder='Enter your organization name...'
								className='border-primary bg-primary/5 p-3 border rounded w-2/3 text-primary text-sm placeholder:text-center placeholder:text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors'
							/>
							{errors.name && (
								<p className='text-red-500'>{errors.name.message}</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<div className='flex flex-col justify-center items-center space-y-2 w-full'>
							<Button
								loading={isOrgCreating}
								className='w-2/3'
								type='submit'>
								Create Organization
							</Button>
							<Button
								onClick={() => dispatch(setOrgCreationModal(false))}
								className='w-2/3'
								variant={'ghost'}
								type='submit'>
								Cancel
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default OrgCreationModal;
