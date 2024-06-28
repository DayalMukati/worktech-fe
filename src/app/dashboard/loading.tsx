import WaveLoader from '@/components/loaders/wave-loader';
import React from 'react';

const Loading = () => {
	return (
		<main>
			<div className='flex flex-col justify-center items-center h-screen'>
				<div className='border-gray-900 border-t-2 border-b-2 rounded-full w-32 h-32 animate-spin'></div>
				<p className='mt-4 text-gray-900'>Loading...</p>
			</div>
		</main>
	);
};

export default Loading;
