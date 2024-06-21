import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { tasks } from '@/data/data';
import Image from 'next/image';
import React from 'react';

export function TaskCardItem({ task }: { task: (typeof tasks)[0] }) {
	return (
		<Card className='hover:bg-secondary transition-colors duration-300 cursor-pointer'>
			<CardHeader>
				<div className='flex sm:flex-row flex-col justify-between items-end sm:items-center'>
					<div className='flex items-center gap-4'>
						<Image
							className='rounded w-16 h-16 object-cover'
							src='/placeholder.svg'
							alt='Organization Logo'
							width={64}
							height={64}
						/>
						<div>
							<CardTitle>{task.title}</CardTitle>
							<CardDescription>{task.description}</CardDescription>
						</div>
					</div>
					<div>
						<Badge className='w-full text-center'>
							{task.organizationId}
						</Badge>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}

const ProjectPage = () => {
	return (
		<div className='mx-auto p-4 container'>
			<div className='flex flex-col justify-center items-center my-10 w-full'>
				<h1 className='text-4xl text-primary'>Open Tasks</h1>
				<p className='text-muted-foreground'>
					<span className='text-primary'>10</span> tasks open
				</p>
			</div>
			<div className='relative gap-4 grid grid-cols-4'>
				<div className='top-4 sticky col-span-1 bg-secondary shadow p-4 border rounded-lg h-96'>
					{/* Filter form goes here */}
					<form>{/* Form elements go here */}</form>
				</div>
				<div className='col-span-3'>
					{/* Tasks display goes here */}
					<div className='gap-4 grid grid-cols-1'>
						{/* Iterate over tasks and display them */}
						{tasks.map(task => (
							<TaskCardItem key={task.id} task={task} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectPage;
