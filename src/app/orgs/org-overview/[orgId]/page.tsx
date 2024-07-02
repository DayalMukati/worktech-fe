'use client';
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { CircleCheck, Users, UserPlus } from 'lucide-react';
import { GET_ALL_SPACES_BY_ORG_ID_QUERY } from '@/graphql/queries';
import { selectSpaces, setSpaces } from '@/store/spacesSlice';
import { useAppDispatch } from '@/hooks/toolKitTyped';
import { useSelector } from 'react-redux';
import { LIST_ALL_TASKS_QUERY } from '@/graphql/queries';
import { GET_ORG_QUERY } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import SkeletonGrid from '@/components/ui/SkeletionGrid';
import { useRouter } from 'next/navigation';

const OrgOverview = () => {
	const params = useParams();
	const orgId = params.orgId as string;
	const { spaces } = useSelector(selectSpaces);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		loading: taskloading,
		error: taskerror,
		data: taskdata
	} = useQuery(LIST_ALL_TASKS_QUERY);

	const { loading, error, data } = useQuery(
		GET_ALL_SPACES_BY_ORG_ID_QUERY,
		{
			variables: { _id: orgId },
			onCompleted: () => {
				dispatch(
					setSpaces({
						spaces: data?.getAllSpacesByOrgId
					})
				);
			}
		}
	);

	const {
		data: orgData,
		error: orgError,
		loading: orgloading
	} = useQuery(GET_ORG_QUERY, {
		variables: {
			_id: orgId
		},
		onError: error => {
			console.log('error', error);
		}
	});

	if (taskloading || loading || orgloading) return <SkeletonGrid />;
	if (error)
		return (
			<ErrorDisplay
				errorMessage={
					error.message ||
					orgError?.message ||
					taskerror?.message ||
					'Unknown error occurred'
				}
			/>
		);
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
								<h1 className='text-[30px]'>
									{orgData?.getOrg?.name}
								</h1>
								<p className='text-[14px] text-slate-400'>
									{orgData?.getOrg?.description ||
										'Encyrpting Ethereum'}
									t
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
								<UserPlus className='mr-2 w-[20px] h-[20px]' /> Follow
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
										Pods
									</h1>
									<div className='flex flex-wrap gap-2 mt-4 overflow-hidden'>
										{spaces.map((spaceItem, index) => {
											return (
												<div
													key={index}
													className='border-2 border-slate-300 bg-secondary shadow p-2 rounded-md min-w-[260px] max-w-[300px] h-[100px] cursor-pointer'
													onClick={() => {
														router.push(
															`/orgs/org-overview/${orgId}/space/${spaceItem._id}/tasks`
														);
													}}>
													<h1 className='text-lg text-slate-700'>
														{spaceItem.name}
													</h1>
													<div className='flex gap-2 mt-2'></div>
													<div className='flex justify-between space-x-3 mt-6 text-slate-500'>
														<div className='flex items-center gap-1 text-sm'>
															<CircleCheck className='w-4 h-4' />
															{}
															<span className='text-sm'>
																{' '}
																Open tasks
															</span>
														</div>
														<div className='flex items-center gap-1 text-sm'>
															<Users className='w-4 h-4' />
															{}
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
									{taskdata && taskdata.listAllTasks.length > 0 ? (
										<ul className='flex flex-col flex-wrap gap-4 mt-6 overflow-hidden'>
											{taskdata?.listAllTasks
												.slice(0, 4)
												.map((opentask, index) => (
													<li
														key={index}
														className='flex items-center gap-4 shadow-md px-4 p-2 border rounded-md w-full'>
														<CircleCheck className='w-5 h-5' />
														<h1 className='text-lg text-slate-400'>
															{opentask.name}
														</h1>
													</li>
												))}
										</ul>
									) : (
										<p className='mt-4 text-slate-500'>
											This organization doesn&apos;t have any open
											tasks at the moment
										</p>
									)}
								</div>
							</div>
						</div>

						<div className='flex flex-col gap-4 py-4 pr-20'>
							<div className='flex flex-col gap-4'>
								<h1 className='mb-2 text-slate-700 text-xl'>About</h1>
								<p className='text-left text-slate-400'>
									No Description
								</p>
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
