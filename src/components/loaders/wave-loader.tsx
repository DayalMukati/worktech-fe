import React, { CSSProperties } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

type WaveLoaderProps = {
	color?: string;
	cssOverride?: CSSProperties;
	size?: number;
};

const WaveLoader = ({
	color = 'white',
	cssOverride = {
		display: 'block',
		margin: '0 auto',
		borderColor: 'red'
	},
	size = 10
}: WaveLoaderProps) => {
	return (
		<SyncLoader color={color} cssOverride={cssOverride} size={size} />
	);
};

export default WaveLoader;
