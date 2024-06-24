import { current } from '@reduxjs/toolkit';
import React from 'react';

const steps = [
	{
		id: 'step 1',
		title: 'Enter Username',
		description: 'Enter Username'
	},
	{
		id: 'step 2',
		title: 'Skills',
		description: 'Enter Skills'
	},
	{
		id: 'step 3',
		title: 'Completed!',
		description: 'Your profile is ready!'
	}
];

const SignupModal = () => {
	const [currentStep, setCurrentStep] = React.useState(0);

	const prev = () => {
		if (currentStep < 1) return;
		setCurrentStep(currentStep - 1);
	};
	const next = () => {
		if (currentStep < steps.length - 1) return;
		setCurrentStep(currentStep + 1);
	};

	return (
		<>
			<div>
				<h1>{steps[currentStep].title}</h1>
				<p>{steps[currentStep].description}</p>
			</div>
			<form>
				{currentStep === 0 && (
					<div>
						<label htmlFor='username'>Username</label>
						<input type='text' id='username' />
					</div>
				)}
				{currentStep === 1 && (
					<div>
						<label htmlFor='skills'>Skills</label>
						<input type='text' id='skills' />
					</div>
				)}
				{currentStep === 2 && (
					<div>
						<h1>Completed!</h1>
					</div>
				)}
			</form>
			<div>
				<button onClick={prev}>Previous</button>
				<button onClick={next}>Next</button>
			</div>
		</>
	);
};

export default SignupModal;
