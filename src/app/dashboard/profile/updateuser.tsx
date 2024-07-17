import { z } from 'zod';
import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { UPDATE_USER_MUTATION } from '@/graphql/mutation';
import { setUser, updateUser } from '@/store/UserSlice';
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@radix-ui/react-avatar';
import { GET_USER_BY_TOKEN } from '@/graphql/queries';
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/icon';
import useSession from '@/hooks/use-session';
import { useAppDispatch, useAppSelector } from '@/hooks/toolKitTyped';

const profileSchema = z.object({
	_id: z.string(),
	bio: z.string().optional(),
	github: z.string().optional(),
	linkedIn: z.string().optional(),
	twitter: z.string().optional(),
	discord: z.string().optional(),
	status: z.number().optional()
});

type Schema = z.infer<typeof profileSchema>;

function Updateuser() {
	const { session } = useSession();
	const dispatch = useAppDispatch();
	const user = useAppSelector(state => state.UserSlice.user);
	const [isEditing, setIsEditing] = useState(false);
	const profileInfoRef = useRef<HTMLDivElement>(null);
	const editFormRef = useRef<HTMLDivElement>(null);
	const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION);
	const { data, loading, error } = useQuery(GET_USER_BY_TOKEN, {
		onCompleted: data => {
			dispatch(setUser(data.getUserByToken as any));
			reset({
				_id: data.getUserByToken._id,
				bio: data.getUserByToken.bio as string,
				github: data.getUserByToken.github as string,
				linkedIn: data.getUserByToken.linkedIn as string,
				twitter: data.getUserByToken.twitter as string,
				discord: data.getUserByToken.discord as string,
				status: data.getUserByToken.status
			});
		}
	});

	const {
		handleSubmit,
		control,
		clearErrors,
		formState: { errors },
		register,
		reset
	} = useForm<Schema>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			_id: user?._id,
			bio: user?.bio,
			github: user?.github,
			linkedIn: user?.linkedIn,
			twitter: user?.twitter,
			discord: user?.discord,
			status: user?.status
		}
	});

	const onSubmit = async (data: Schema) => {
		if (!session._id) {
			console.error('Session ID is undefined');
			return;
		}

		try {
			await updateUserMutation({
				variables: {
					_id: session._id,
					input: {
						status: data.status,
						github: data.github,
						bio: data.bio,
						discord: data.discord,
						linkedIn: data.linkedIn,
						twitter: data.twitter
					}
				}
			});
			dispatch(
				updateUser({
					featureWork: user.featureWork,
					education: user.education,
					...data
				})
			);
			setIsEditing(false);
			profileInfoRef.current?.classList.remove('hidden');
			editFormRef.current?.classList.add('hidden');
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleEditClick = () => {
		profileInfoRef.current?.classList.add('hidden');
		editFormRef.current?.classList.remove('hidden');
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		profileInfoRef.current?.classList.remove('hidden');
		editFormRef.current?.classList.add('hidden');
		setIsEditing(false);
		reset(user); // Reset to current user data
	};

	const handleSaveClick = () => {
		handleSubmit(onSubmit)();
	};

	return (
		<div className='flex flex-col justify-center items-center gap-1 border-slate-300 bg-card shadow-md mx-auto p-6 border rounded-md w-full max-w-md text-card-foreground'>
			<div className='relative'>
				<Avatar>
					<AvatarImage
						src={'https://github.com/shadcn.png'}
						className='rounded-full w-28 h-28'
					/>
					<AvatarFallback>Avatar</AvatarFallback>
				</Avatar>
				{isEditing ? (
					<button
						id='edit-button'
						className='right-1 bottom-1 absolute bg-primary p-1 rounded-full text-primary-foreground'>
						<Icons icon='mdi:pencil' />
					</button>
				) : (
					<button
						className={`right-2 bottom-1 absolute p-2 border-2 border-white rounded-full shadow-xl
                  ${
										user.status === 0 ? 'bg-red-700' : 'bg-green-500'
									} 
                  `}
					/>
				)}
			</div>
			<div
				id='profile-info'
				ref={profileInfoRef}
				className={`mt-4 text-center ${isEditing ? 'hidden' : ''}`}>
				<h2 className='font-semibold text-lg'>
					{user.email || 'Username'}
				</h2>
				<p className='text-muted-foreground'>
					{user.bio || 'No bio..'}
				</p>
			</div>
			<div
				id='edit-form'
				ref={editFormRef}
				className={`mt-4 w-full ${isEditing ? '' : 'hidden'}`}>
				<form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					<input
						type='hidden'
						{...register('_id')}
						defaultValue={user?._id}
					/>
					<div className='mb-2'>
						<Input
							className='bg-input mt-1 px-2 py-1 border border-border rounded w-full text-foreground text-slate-700'
							placeholder='Add a bio...'
							{...register('bio')}
						/>
						{errors.bio && (
							<span className='text-red-500 text-xs'>
								{errors.bio.message}
							</span>
						)}
					</div>
					<div className='flex justify-center items-center mb-2'>
						<Icons icon='mdi:github' className='mr-2 w-8 h-8' />
						<Input
							type='text'
							className='bg-input mt-1 px-2 py-1 border border-border rounded w-full text-foreground text-slate-700'
							placeholder='https://github.com/username'
							{...register('github')}
						/>
						{errors.github && (
							<span className='text-red-500 text-xs'>
								{errors.github.message}
							</span>
						)}
					</div>
					<div className='flex items-center mb-2'>
						<Icons
							icon='hugeicons:user-status'
							className='mr-2 w-8 h-8 text-slate-400'
						/>
						<Controller
							name='status'
							control={control}
							render={({ field }) => (
								<select
									id='status'
									className='bg-input mt-1 px-2 py-1.5 border border-border rounded w-full text-foreground text-slate-700'
									{...field}
									value={field.value?.toString()} // Ensure the value is a string for the select component
									onChange={e =>
										field.onChange(parseInt(e.target.value))
									} // Convert the value back to a number on change
								>
									<option value={1}>Active</option>
									<option value={0}>Inactive</option>
								</select>
							)}
						/>
						{errors.status && (
							<span className='text-red-500 text-xs'>
								{errors.status.message}
							</span>
						)}
					</div>
					<div className='flex justify-center items-center mb-2'>
						<Icons
							icon='mdi:linkedin'
							className='mr-2 w-8 h-8 text-blue-900'
						/>
						<Input
							type='text'
							placeholder='https://linkedIn.com/in/username'
							className='bg-input mt-1 px-2 py-1 border border-border rounded w-full text-foreground text-slate-700'
							{...register('linkedIn')}
						/>
						{errors.linkedIn && (
							<span className='text-red-500 text-xs'>
								{errors.linkedIn.message}
							</span>
						)}
					</div>
					<div className='flex justify-center items-center mb-2'>
						<Icons
							icon='mdi:twitter'
							className='mr-2 w-8 h-8 text-blue-400'
						/>
						<Input
							type='text'
							placeholder='https://twitter.com/username'
							className='bg-input mt-1 px-2 py-1 border border-border rounded w-full text-foreground text-slate-700'
							{...register('twitter')}
						/>
						{errors.twitter && (
							<span className='text-red-500 text-xs'>
								{errors.twitter.message}
							</span>
						)}
					</div>
					<div className='flex justify-center items-center mb-2'>
						<Icons
							icon='mdi:discord'
							className='mr-2 w-8 h-8 text-[#5865F2]'
						/>
						<Input
							type='text'
							placeholder='https://discord.com/users/username'
							className='bg-input mt-1 px-2 py-1 border border-border rounded w-full text-foreground text-slate-700'
							{...register('discord')}
						/>
						{errors.discord && (
							<span className='text-red-500 text-xs'>
								{errors.discord.message}
							</span>
						)}
					</div>
					<div className='flex justify-center items-center mt-4'>
						<Button
							id='cancel-button'
							className='bg-slate-300 hover:bg-slate-400 shadow mx-2 px-4 py-1 rounded-md text-slate-900'
							onClick={handleCancelClick}>
							Cancel
						</Button>
						<Button
							id='save-button'
							className='bg-primary px-4 py-1 rounded-md text-primary-foreground'
							type='submit'
							onClick={handleSaveClick}>
							Save
						</Button>
					</div>
				</form>
			</div>
			{!isEditing && (
				<Button
					id='settings-button'
					className='bg-primary px-4 py-1 rounded-md w-full text-primary-foreground'
					onClick={handleEditClick}>
					Edit Profile
				</Button>
			)}
			<Button
				id='settings-button'
				className='bg-primary mt-1 px-4 py-1 rounded-md w-full text-primary-foreground'>
				Settings
			</Button>
		</div>
	);
}

export default Updateuser;
