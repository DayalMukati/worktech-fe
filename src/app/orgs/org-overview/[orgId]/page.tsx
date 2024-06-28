import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
	Camera,
	Home,
	User,
	Settings,
	Tag,
	EyeOff,
	BookOpen,
	CircleCheck,
	Users,
	UserPlus,
	LogIn
} from 'lucide-react';

const OrgOverview = () => {
	const spacesItems = [
		{
			id: 1,
			name: 'Community Contributors',
			tags: [Settings, Tag, EyeOff],
			description: 'Space 1 description',
			contributers: 487,
			createdAt: '2023-01-01',
			updatedAt: '2023-01-01',
			opentask: '5'
		},
		{
			id: 2,
			name: 'Developers Contributors',
			tags: [Settings, Tag, EyeOff],
			description: 'Space 2 description',
			contributers: 440,
			createdAt: '2023-01-01',
			updatedAt: '2023-01-01',
			opentask: '2'
		},
		{
			id: 3,
			name: 'Space 3',
			tags: [Settings, Tag, EyeOff],
			description: 'Space 3 description',
			contributers: 680,
			createdAt: '2023-01-01',
			updatedAt: '2023-01-01',
			opentask: '5'
		}
		// {
		//   id: 3,
		//   name: "Space 3",
		//   tags: ["tag1", "tag2"],
		//   description: "Space 3 description",
		//   contributers: 680,
		//   createdAt: "2023-01-01",
		//   updatedAt: "2023-01-01",
		// },
	];

	const OpentaskList = [
		{
			id: 1,
			name: 'Post about TEN (reserved)',
			icon: 'task2',
			description: 'task 1 description',
			createdDate: '2023-01-01',
			days: 5
		},
		{
			id: 2,
			name: 'Submit your contribution (Twitter/X threads)',
			icon: 'task2',
			description: 'Tasl 2 description',
			createdDate: '2023-01-01',
			days: 9
		},
		{
			id: 2,
			name: 'Re test the whole user flow',
			icon: 'task2',
			description: 'Tasl 2 description',
			createdDate: '2023-01-01',
			days: 11
		}
	];

	const AboutTags = ['Privacy', 'Ethereum', 'Layer'];

	return (
		<div className='p-4'>
			<div className='grid grid-rows-1 bg-white shadow-lg border rounded-lg w-full'>
				<div className='h-full'>
					<div className='flex justify-between'>
						<div className='flex gap-2 my-6 px-10'>
							<Image
								src='/image.png'
								className='w-18 h-18'
								width={100}
								height={100}
								alt='logo'
							/>
							<div className='flex flex-col'>
								<h1 className='text-[30px]'>Ten formerly Obscuro</h1>
								<p className='text-[14px] text-slate-400'>
									Encyrpting Ethereum
								</p>
								<div className='flex mt-4 text-slate-600 text-sm'>
									<span>Time to payment 0.0 days </span>
								</div>
							</div>
						</div>
						<div className='flex flex-col mx-4 mt-6'>
							{/* <Button className="flex justify-between bg-primary w-24">
              <LogIn className="w-[20px] h-[20px]" />
              Login
            </Button> */}
							<Button className='flex bg-primary w-24'>
								<UserPlus className='w-[20px] h-[20px]' /> Follow
							</Button>
						</div>
					</div>
				</div>

				<div className='border-t-2'>
					<div className='grid grid-cols-4 h-full'>
						<div className='col-span-3'>
							<div className='grid grid-rows-3 h-full'>
								<div className='px-8 py-4'>
									<h1 className='mb-2 text-slate-700 text-xl'>
										Spaces
									</h1>
									<div className='flex flex-wrap gap-2 mt-4 overflow-hidden'>
										{spacesItems.map((spaceItem, index) => {
											return (
												<div
													key={index}
													className='border-2 border-slate-300 bg-secondary shadow p-2 rounded-md w-[260px] h-[100px]'>
													<h1 className='text-lg text-slate-700'>
														{spaceItem.name}
													</h1>
													<div className='flex gap-2 mt-2'>
														{/* {spaceItem.tags.map((Tag, index) => {
                            return (
                              <div
                                key={index}
                                className="text-slate-400 text-xs cursor-pointer"
                              >
                                <Tag className="w-8 h-8" />
                              </div>
                            );
                          })} */}
													</div>
													<div className='flex justify-between mt-6 text-slate-500'>
														<div className='flex items-center gap-1 text-sm'>
															<CircleCheck className='w-4 h-4' />
															{spaceItem.opentask}{' '}
															<span className='text-sm'>
																Open tasks
															</span>
														</div>
														<div className='flex items-center gap-1 text-sm'>
															<Users className='w-4 h-4' />
															{spaceItem.contributers}{' '}
															<span className='text-sm'>
																Contributers
															</span>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>

								<div className='mr-10 px-8 py-4 border-t-2'>
									<h1 className='mb-2 text-slate-700 text-xl'>
										Open Tasks
									</h1>
									<ul className='flex flex-col flex-wrap gap-4 mt-6 overflow-hidden'>
										{OpentaskList.map((opentask, index) => {
											return (
												<li
													key={index}
													className='flex items-center gap-4 shadow-md px-4 p-2 border rounded-md w-full'>
													<CircleCheck className='w-5 h-5' />
													<h1 className='text-lg text-slate-400'>
														{opentask.name}
													</h1>
													<span className='ml-auto text-slate-400'>
														{opentask.days} days ago
													</span>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>

						<div className='flex flex-col gap-4 py-4 pr-20'>
							<div className='flex flex-col gap-4'>
								<h1 className='mb-2 text-slate-700 text-xl'>
									About
								</h1>
								<p className='text-left text-slate-400'>
									We&apos;re building the first general. purpose, EVM
									equivalent, encrypted L2 for Ethereum
								</p>
								<div className='flex flex-wrap gap-4 overflow-hidden'>
									{AboutTags.map((tag, index) => {
										return (
											<div
												key={index}
												className='border-primary/40 px-2 border rounded-md text-primary'>
												{tag}
											</div>
										);
									})}
								</div>
							</div>

							<div className='flex flex-col gap-4 mt-4'>
								<h1 className='text-slate-700 text-xl'>
									Contributers
								</h1>
								<div className='relative flex justify-center items-center gap-2 border-2 border-slate-400 p-1 rounded-full w-fit h-fit text-white'>
									<Avatar>
										<AvatarImage src='https://github.com/shadcn.png' />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>

									{/* <span className="top-50 absolute text-black text-lg">A</span> */}
								</div>
								<Button className='bg-primary px-3 py-1 w-fit text-sm'>
									Invite Contributors
								</Button>
							</div>
							<div className='flex flex-col gap-4 mt-4'>
								<h1 className='text-slate-700 text-xl'>Admins</h1>
								<div className='relative flex justify-center items-center gap-2 border-2 border-slate-400 p-1 rounded-full w-fit h-fit text-white'>
									<Avatar>
										<AvatarImage src='https://github.com/shadcn.png' />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrgOverview;
