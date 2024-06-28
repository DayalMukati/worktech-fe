'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_TOKEN } from '@/graphql/queries';
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@radix-ui/react-avatar';
import { CircleHelp, CirclePlus, Coffee, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loadUser, selectUserAuth } from '@/store/authSlice';
import Icons from '@/components/ui/icon';
import useSession from '@/hooks/use-session';

const UserProfile = () => {
	const [user, setUser] = useState(null);

	const { data, loading, error } = useQuery(GET_USER_BY_TOKEN, {
		onCompleted: data => {
			// setUser(data.getUserByToken);
		}
	});

	const [isEditing, setIsEditing] = useState(false);
	const profileInfoRef = useRef<HTMLDivElement>(null);
	const editFormRef = useRef<HTMLDivElement>(null);

	const handleEditClick = () => {
		if (profileInfoRef.current && editFormRef.current) {
			profileInfoRef.current.classList.add('hidden');
			editFormRef.current.classList.remove('hidden');
			setIsEditing(true);
		}
	};

	const handleCancelClick = () => {
		if (profileInfoRef.current && editFormRef.current) {
			profileInfoRef.current.classList.remove('hidden');
			editFormRef.current.classList.add('hidden');
			setIsEditing(false);
		}
	};

	const handleSaveClick = () => {
		if (profileInfoRef.current && editFormRef.current) {
			profileInfoRef.current.classList.remove('hidden');
			editFormRef.current.classList.add('hidden');
			setIsEditing(false);
			// Add save functionality here
		}
	};

	if (loading)
		return (
			<p className='flex justify-center items-center h-full'>
				Loading...
			</p>
		);

	if (error)
		return (
			<p className='flex justify-center items-center h-full'>
				Error: {error.message}
			</p>
		);

	return (
		<div className='flex mt-12 px-36'>
			<div className='flex flex-col gap-4 w-1/3'>
				<div className='flex flex-col justify-between items-center gap-1 h-full'>
					<div className='flex flex-col justify-center items-center gap-1 border-slate-300 bg-card shadow-lg mx-auto p-6 border rounded-md w-full max-w-md text-card-foreground'>
						<div className='relative'>
							<Avatar>
								<AvatarImage
									src='https://github.com/shadcn.png'
									className='rounded-full w-28 h-28'
								/>
								<AvatarFallback>Avatar</AvatarFallback>
							</Avatar>
							{isEditing ? (
								<button
									id='edit-button'
									className='right-0 bottom-0 absolute bg-primary p-1 rounded-full text-primary-foreground'>
									{' '}
									<Icons icon='mdi:pencil'></Icons>
								</button>
							) : null}
						</div>
						<div
							id='profile-info'
							ref={profileInfoRef}
							className={`mt-4 text-center ${
								isEditing ? 'hidden' : ''
							}`}>
							<h2 className='font-semibold text-lg'>
								{data?.getUserByToken.firstName}
							</h2>
							<p className='text-muted-foreground'>No bio..</p>
						</div>
						<div
							id='edit-form'
							ref={editFormRef}
							className={`mt-4 w-full ${isEditing ? '' : 'hidden'}`}>
							<div className='mb-2'>
								<input
									type='text'
									defaultValue={
										data?.getUserByToken.firstName as string
									}
									className='bg-input p-2 border border-border rounded-md w-full text-foreground'
								/>
							</div>
							<div className='mb-2'>
								<textarea
									className='bg-input p-2 border border-border rounded-md w-full text-foreground'
									rows={2}>
									Add a bio...
								</textarea>
							</div>
							<div className='flex justify-center items-center mb-2'>
								<Icons
									icon='mdi:github'
									className='mr-1 w-8 h-8'></Icons>
								<input
									type='text'
									defaultValue='https://github.com/harsh'
									className='bg-input p-2 border border-border rounded-md w-full text-foreground'
								/>
							</div>
							<div className='flex justify-center items-center mb-2'>
								<Icons
									icon='mdi:linkedin'
									className='mr-1 w-8 h-8 text-blue-900'></Icons>

								<input
									type='text'
									defaultValue='https://www.linkedin.com/in/harsh'
									className='bg-input p-2 border border-border rounded-md w-full text-foreground'
								/>
							</div>
							<div className='flex justify-center items-center mb-2'>
								<Icons
									icon='mdi:twitter'
									className='mr-1 w-8 h-8 text-blue-600'></Icons>

								<input
									type='text'
									defaultValue='https://twitter.com/harsh'
									className='bg-input p-2 border border-border rounded-md w-full text-foreground'
								/>
							</div>

							<div className='flex justify-center items-center mb-2'>
								<Icons
									icon='mdi:location-outline'
									className='mr-1 w-8 h-8 text-primary'></Icons>

								<input
									type='text'
									defaultValue='Indore,MP'
									className='bg-input p-2 border border-border rounded-md w-full text-foreground'
								/>
							</div>
						</div>
						{isEditing ? (
							<div className='flex justify-between'>
								<Button
									id='cancel-button'
									className='bg-slate-300 hover:bg-slate-400 shadow mx-2 px-4 py-1 rounded-md text-slate-900'
									onClick={handleCancelClick}>
									Cancel
								</Button>
								<Button
									id='save-button'
									className='bg-primary px-4 py-1 rounded-md text-primary-foreground'
									onClick={handleSaveClick}>
									Save
								</Button>
							</div>
						) : (
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

					<div className='flex flex-col gap-6 border-slate-300 shadow-lg p-4 border rounded-md w-full h-fit text-slate-400'>
						<div className='flex items-center gap-2 text-md'>
							<h1 className='font-semibold text-slate-400 text-sm'>
								REPUTATION SCORE
							</h1>
							<CircleHelp className='w-4 h-4 text-slate-400' />
						</div>
						<div className='flex flex-col text-md'>
							<h1 className='font-semibold text-slate-400 text-sm'>
								EARNINGS
							</h1>
							<span>$0.00</span>
						</div>
						<div className='flex flex-col text-md'>
							<h1 className='font-semibold text-slate-400 text-sm'>
								REVENUE SHARE
							</h1>
							<span>1.00%</span>
						</div>
					</div>
					<div className='flex flex-col gap-6 border-slate-300 shadow-lg p-4 border rounded-md w-full h-fit text-slate-400'>
						<div className='w-full'>
							<h1 className='font-semibold text-slate-400 text-sm'>
								ORGANIZATIONS
							</h1>
							<div className='flex gap-2 border-2 border-primary/60 p-2 rounded-md'>
								<Zap className='w-6 h-6 text-black' />
								KC
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col space-y-1 mx-2 w-2/3'>
				<div className='flex flex-col justify-center border-slate-300 shadow-lg p-2 border rounded-md h-[18rem]'>
					<h1 className='font-semibold text-lg text-slate-600'>
						Featured work
					</h1>
					<div className='flex flex-col justify-center items-center border-slate-400 p-6 border border-dashed w-1/3 h-full text-center'>
						<CirclePlus className='w-12 h-12 text-slate-900 cursor-pointer' />
						<span className='mt-4 font-semibold text-slate-500 text-sm'>
							Feature work to show your experience
						</span>
					</div>
				</div>
				<div className='flex flex-col border-slate-300 bg-white shadow-lg p-2 border rounded-md'>
					<p className='font-semibold text-lg text-slate-600'>
						Contribution
					</p>
					<div className='flex flex-col justify-center items-center mt-4'>
						<Coffee className='bg-secondary p-2 rounded-full w-16 h-16 text-slate-800 cursor-pointer' />
						<span className='text-md text-slate-400'>
							No public tasks completed yet
						</span>
						<Button className='bg-primary my-2 px-4 h-fit text-md'>
							Explore open tasks
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
