import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { tasks } from '@/conf/data';
import Image from 'next/image';
import React from 'react';

function TaskCardItem({ task }: { task: (typeof tasks)[0] }) {
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

export default TaskCardItem;
