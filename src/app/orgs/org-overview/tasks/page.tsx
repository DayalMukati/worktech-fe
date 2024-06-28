import TaskBoard from '@/components/task-board';

import React from 'react';

const ProjectPage = () => {
	return (
		<div className='pt-2'>
			<TaskBoard isContributer={false} />
		</div>
	);
};

export default ProjectPage;
