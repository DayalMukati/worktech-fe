import React from 'react';
import { tasks } from '@/conf/data';
import TaskCardItem from '@/components/task-card-item';

const OpenTaskList = () => {
	return (
		<div className='w-full container'>
			<div className='flex flex-col justify-center items-center my-10 w-full'>
				<h1 className='text-4xl text-primary'>Open Tasks</h1>
				<p className='text-muted-foreground'>
					<span className='text-primary'>10</span> tasks open
				</p>
			</div>
			<div className='gap-4 grid grid-cols-3'>
				{/* Iterate over tasks and display them */}
				{tasks.map(task => (
					<TaskCardItem key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};

export default OpenTaskList;
