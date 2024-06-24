
import Link from 'next/link';
import React from 'react';

const main = () => {
	return (
		<div>
			{/* <LoginFullScreen /> */}
			<Link href='/dashboard/tasks'>
				<a>Tasks</a>
			</Link>
			<Link href='/dashboard'>
				<a>Dashboard</a>
			</Link>
		</div>
	);
};

export default main;
