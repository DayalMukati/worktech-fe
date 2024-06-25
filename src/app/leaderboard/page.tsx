import React from 'react';
import TopContributor from "@/components/TopContributors";
import TopReviewer from "@/components/TopReviewer";
import { MailWarningIcon } from 'lucide-react';
import { data1 } from '@/conf/data';
import { data2 } from '@/conf/data';
function Leaderboard() {
	return (
		<>
			<div className='flex justify-start mt-4 mb-10'>
				<div className='flex w-full'>
					<TopContributor data={data1} />
				</div>
				<div className='flex w-full'>
					<TopReviewer data={data2} />
				</div>
			</div>
		</>
	);
}

export default Leaderboard;
