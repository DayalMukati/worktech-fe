import TaskBoard from '@/components/task-board';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import BoardGrid from '@/components/ui/boardGrid';
import { GET_ALL_TASKS_BY_SPACE_ID_QUERY } from '@/graphql/queries';
import { setPrivateTasks } from '@/store/taskSlice';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

import React from 'react';
import { useDispatch } from 'react-redux';

const ProjectPage = () => {
	return (
		<div className='pt-2'>
			<TaskBoard isContributer={false} />
		</div>
	);
};

export default ProjectPage;
