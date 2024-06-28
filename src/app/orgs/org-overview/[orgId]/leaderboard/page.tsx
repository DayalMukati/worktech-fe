import React from 'react';
import TopContributor from '@/components/TopContributors';
import TopReviewer from '@/components/TopReviewer';
import { MailWarningIcon } from 'lucide-react';
 
function Leaderboard() {
	return (
		<>
			<div className='flex justify-start mt-4 mb-10'>
				<div className='flex w-full'>
					<TopContributor/>
				</div>
				<div className='flex w-full'>
					<TopReviewer  />
				</div>
			</div>
		</>
	);
}

export default Leaderboard;
