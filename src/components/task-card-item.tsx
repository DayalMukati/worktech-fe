import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function TaskCardItem({ task, logo }: any) {
	const router = useRouter();
	return (
		<Card className='border-2 border-primary/20 hover:bg-secondary min-w-[300px] max-w-[400px] h-full transition-colors duration-300 cursor-pointer'>
			<CardHeader>
				<div
					className='flex sm:flex-row flex-col justify-between items-end sm:items-center'
					onClick={() => router.push(`/orgs/tasks/${task._id}`)}>
					<div className='flex items-center gap-4'>
						<Image
							className='rounded w-16 h-16 object-cover'
							// src="/logo-4.png"
							src={logo?.src}
							alt={logo?.alt}
							width={64}
							height={64}
						/>
						<div>
							<CardTitle className='text-ellipsis text-md text-wrap overflow-hidden'>
								{task.name.length > 25
									? task.name.substring(0, 25) + '...'
									: task.name}
							</CardTitle>
							<CardDescription className='text-ellipsis text-wrap overflow-hidden'>
								{task.description.length > 40
									? task.description.substring(0, 40) + '...'
									: task.description}
							</CardDescription>
						</div>
					</div>
					<div>
						<Badge className='border-primary bg-secondary border w-full text-center text-primary hover:text-white'>
							{task.status}
						</Badge>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}

export default TaskCardItem;
