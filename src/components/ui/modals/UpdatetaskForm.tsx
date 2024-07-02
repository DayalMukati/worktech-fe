'use client'; // Assuming this is a placeholder for TypeScript or similar

import React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@headlessui/react';
import { Label } from '@radix-ui/react-label';
import Select, { components } from 'react-select';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK_MUTATION } from '@/graphql/mutation';
import { useAppSelector } from '@/hooks/toolKitTyped';
import { selectUserAuth } from '@/store/authSlice';
import useSmartContract from '@/hooks/useSmartContract';
import { LIST_ALL_TASKS_QUERY } from '@/graphql/queries';
import {
	CircleCheck,
	Users,
	ShieldCheck,
	DraftingCompass
} from 'lucide-react';

// Define the schema using Zod
const UpdateTaskSchema = z.object({
	id: z.string(),
	taskName: z.string().min(2, 'Task Name is required'),
	description: z.string().min(2, 'Description is required'),
	acceptanceCriteria: z
		.string()
		.min(2, 'Acceptance Criteria is required'),
	status: z.number().min(0, 'Status is required'),
	assinees: z.array(z.string()).min(1, 'assinees is required'),
	priority: z.string().min(1, 'Priority is required'),
	reviewer: z.string().min(1, 'Reviewer is required'),
	price: z.string().min(1, 'Price is required')
});

type Schema = z.infer<typeof UpdateTaskSchema>;

const status = [
	{ value: 0, label: 'Open', icon: <CircleCheck /> },
	{ value: 1, label: 'To-Do', icon: <CircleCheck /> },
	{ value: 2, label: 'In Progress', icon: <CircleCheck /> },
	{ value: 3, label: 'In Review', icon: <CircleCheck /> },
	{ value: 4, label: 'Done', icon: <CircleCheck /> },
	{ value: 5, label: 'Backlog', icon: <CircleCheck /> }
];

const customOption = (props: any) => (
	<components.Option {...props}>
		<div className='flex items-center'>
			{props.data.icon}
			<span className='ml-2'>{props.data.label}</span>
		</div>
	</components.Option>
);

const customSingleValue = (props: any) => (
	<components.SingleValue {...props}>
		<div className='flex items-center'>
			{props.data.icon}
			<span className='ml-2'>{props.data.label}</span>
		</div>
	</components.SingleValue>
);

const assineesOptions = [
	{
		value: '6672dba833963a34ca6b6b9d',
		label: 'ak@gmail.com',
		icon: <Users className='w-4 h-4' />
	},
	{
		value: '6672dba833963a34ca6b6b9d',
		label: 'dayal@gmail.com',
		icon: <Users className='w-4 h-4' />
	},
	{
		value: '6672dba833963a34ca6b6b9d',
		label: 'vineet@gmail.com',
		icon: <Users className='w-4 h-4' />
	}
];

const customOptionassinees = (props: any) => (
	<components.Option {...props}>
		<div className='flex items-center'>
			{props.data.icon}
			<span className='ml-2'>{props.data.label}</span>
		</div>
	</components.Option>
);

const customSingleValueassinees = (props: any) => (
	<components.SingleValue {...props}>
		<div className='flex items-center'>
			{props.data.icon}
			<span className='ml-2'>{props.data.label}</span>
		</div>
	</components.SingleValue>
);

const priorityOptions = [
	{ value: 'low', label: 'Low', color: 'green' },
	{ value: 'medium', label: 'Medium', color: 'yellow' },
	{ value: 'high', label: 'High', color: 'red' }
];

const customPriorityOption = (props: any) => (
	<components.Option {...props}>
		<div className='flex items-center'>
			<span
				className={`mr-2 h-2 w-2 rounded-full bg-${props.data.color}-500`}
			/>
			<span>{props.data.label}</span>
		</div>
	</components.Option>
);

const customPrioritySingleValue = (props: any) => (
	<components.SingleValue {...props}>
		<div className='flex items-center'>
			<span
				className={`mr-2 h-2 w-2 rounded-full bg-${props.data.color}-500`}
			/>
			<span>{props.data.label}</span>
		</div>
	</components.SingleValue>
);

const reviewerOptions = [
	{ value: 'ak@gmail.com', label: 'Ak-8968' },
	{ value: 'dn@gmail.com', label: 'DM-477' },
	{ value: 'vineet@gmail.com', label: 'Vk-123' }
];

const UpdateTaskForm = ({
	spaceId,
	handlePostSubmit,
	column
}: {
	spaceId: string;
	handlePostSubmit: Function;
	column: string;
}) => {
	const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);
	const {
		handleSubmit,
		control,
		clearErrors,
		formState: { errors },
		register
	} = useForm<Schema>({
		resolver: zodResolver(UpdateTaskSchema)
	});

	const { web3 } = useAppSelector(selectUserAuth);
	const { callMethod } = useSmartContract();

	const onSubmitForm = async (data: Schema) => {
		try {
			const result = await callMethod('UpdateTask', [
				'Error Handling',
				100000000000000000,
				'0x45f520587bf5CA91c922dEFBc596A6A5Ce294039'
			]);
			console.log('result', result);

			const { data: mutationData } = await updateTaskMutation({
				variables: {
					_id: data.id,
					input: {
						space: spaceId,
						name: data.taskName,
						description: data.description,
						priority: data.priority,
						amount: Number(data.price),
						activities: [],
						reviewer: data.reviewer,
						assinees: data.assinees,
						skills: [],
						acceptanceCriteria: data.acceptanceCriteria,
						status: data.status
					}
				}
			});

			handlePostSubmit(mutationData);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<form autoComplete='off' onSubmit={handleSubmit(onSubmitForm)}>
			<div className='gap-6 grid grid-cols-3 p-4'>
				<div className='col-span-2'>
					<Label className='text-md text-slate-800'>Task Name</Label>
					<Input
						type='text'
						{...register('taskName')}
						placeholder='Task Name'
						className='w-[400px] text-sm focus-visible:ring-0 focus:ring-0 border-2 border-slate-400 rounded-md text-slate-600'
					/>
					{errors.taskName && (
						<span className='text-red-500 text-xs'>
							{errors.taskName.message}
						</span>
					)}
					<div className='flex gap-4 mt-4'>
						<Button className='gap-3 bg-[#7D6CE2FF] text-center'>
							<ShieldCheck className='w-4 h-4' />
							Permissions
						</Button>
						<Button className='gap-3 bg-[#7D6CE2FF] text-center'>
							<DraftingCompass className='w-4 h-4' />
							Add Skills
						</Button>
					</div>
					<div className='mt-4'>
						<Label className='text-md text-slate-800'>
							Task Description
						</Label>
						<Textarea
							placeholder='Task Description'
							{...register('description')}
							onChange={() => clearErrors('description')}
							className='border-2 border-slate-400 rounded-md w-full h-[80px] font-sm text-slate-600 text-sm indent-2 outline-none'
						/>
						{errors.description && (
							<span className='text-red-500 text-xs'>
								{errors.description.message}
							</span>
						)}
					</div>
					<div className='mt-4'>
						<Label className='text-md text-slate-800'>
							Acceptance Criteria
						</Label>
						<Textarea
							placeholder='Acceptance criteria'
							{...register('acceptanceCriteria')}
							className='border-2 border-slate-400 rounded-md w-full font-sm text-slate-600 text-sm indent-2 outline-none'
						/>
						{errors.acceptanceCriteria && (
							<span className='text-red-500 text-xs'>
								{errors.acceptanceCriteria.message}
							</span>
						)}
					</div>

					<Button
						type='submit'
						className='block bg-[#7D6CE2FF] mt-4 w-full text-center'>
						Update
					</Button>
				</div>

				<div>
					<div className='flex flex-col justify-between items-center gap-4'>
						<div className='w-full text-slate-900 text-sm uppercase'>
							<Label className='text-slate-800 text-sm'>Status</Label>
							<Controller
								name='status'
								control={control}
								render={({ field }) => (
									<Select
										styles={{
											control: (baseStyles, { isFocused }) => ({
												...baseStyles,
												borderColor: isFocused ? 'red' : 'grey',
												cursor: 'pointer'
											})
										}}
										options={status}
										defaultValue={status.find(
											s => s.value === parseInt(column)
										)}
										onChange={selectedOption => {
											field.onChange(
												selectedOption ? selectedOption.value : null
											);
											clearErrors('status');
										}}
										components={{
											Option: customOption,
											SingleValue: customSingleValue
										}}
									/>
								)}
							/>
							{errors.status && (
								<span className='text-red-500 text-xs'>
									{errors.status.message}
								</span>
							)}
						</div>

						<div className='w-full text-slate-900 text-sm uppercase'>
							<Label className='text-slate-800 text-sm'>
								assinees
							</Label>
							<Controller
								name='assinees'
								control={control}
								render={({ field }) => (
									<Select
										styles={{
											control: (baseStyles, { isFocused }) => ({
												...baseStyles,
												borderColor: isFocused ? 'red' : 'grey',
												cursor: 'pointer'
											})
										}}
										options={assineesOptions}
										isMulti
										onChange={selectedOptions => {
											const values = selectedOptions
												? selectedOptions.map(o => o.value)
												: [];
											field.onChange(values);
											clearErrors('assinees');
										}}
										components={{
											Option: customOptionassinees,
											SingleValue: customSingleValueassinees
										}}
									/>
								)}
							/>
							{errors.assinees && (
								<span className='text-red-500 text-xs'>
									{errors.assinees.message}
								</span>
							)}
						</div>

						<div className='w-full text-slate-900 text-sm uppercase'>
							<Label className='text-slate-800 text-sm'>
								Priority
							</Label>
							<Controller
								name='priority'
								control={control}
								render={({ field }) => (
									<Select
										styles={{
											control: (baseStyles, { isFocused }) => ({
												...baseStyles,
												borderColor: isFocused ? 'red' : 'grey',
												cursor: 'pointer'
											})
										}}
										options={priorityOptions}
										onChange={selectedOption => {
											field.onChange(
												selectedOption ? selectedOption.value : null
											);
											clearErrors('priority');
										}}
										components={{
											Option: customPriorityOption,
											SingleValue: customPrioritySingleValue
										}}
									/>
								)}
							/>
							{errors.priority && (
								<span className='text-red-500 text-xs'>
									{errors.priority.message}
								</span>
							)}
						</div>

						<div className='w-full text-slate-900 text-sm uppercase'>
							<Label className='text-slate-800 text-sm'>
								Reviewer
							</Label>
							<Controller
								name='reviewer'
								control={control}
								render={({ field }) => (
									<Select
										styles={{
											control: (baseStyles, { isFocused }) => ({
												...baseStyles,
												borderColor: isFocused ? 'red' : 'grey',
												cursor: 'pointer'
											})
										}}
										options={reviewerOptions}
										onChange={selectedOption => {
											field.onChange(
												selectedOption ? selectedOption.value : null
											);
											clearErrors('reviewer');
										}}
									/>
								)}
							/>
							{errors.reviewer && (
								<span className='text-red-500 text-xs'>
									{errors.reviewer.message}
								</span>
							)}
						</div>
					</div>

					<div className='mt-2 w-full text-slate-900 text-sm uppercase'>
						<Label className='uppercase'>HBAR-Price</Label>
						<Input
							type='text'
							{...register('price')}
							placeholder='Price'
							onChange={() => clearErrors('price')}
							className='focus-visible:ring-0 focus:ring-0'
						/>
						{errors.price && (
							<span className='text-red-500 text-xs'>
								{errors.price.message}
							</span>
						)}
					</div>
				</div>
			</div>
		</form>
	);
};

export default UpdateTaskForm;
