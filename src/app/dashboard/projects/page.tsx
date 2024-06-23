import TaskCardItem from '@/components/task-card-item';

import { tasks } from '@/data/data';

import React from 'react';

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
