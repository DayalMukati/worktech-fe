interface Organization {
	id: number;
	name: string;
	description: string;
	location: string;
}
type Task = {
	id: number;
	title: string;
	description: string;
	organizationId: number;
};

const organizations: Organization[] = [
	{
		id: 1,
		name: 'Organization 1',
		description: 'This is the description for Organization 1',
		location: 'Location 1'
	},
	{
		id: 2,
		name: 'Organization 2',
		description: 'This is the description for Organization 2',
		location: 'Location 2'
	},
	{
		id: 3,
		name: 'Organization 3',
		description: 'This is the description for Organization 3',
		location: 'Location 3'
	},
	{
		id: 4,
		name: 'Organization 4',
		description: 'This is the description for Organization 4',
		location: 'Location 4'
	},
	{
		id: 5,
		name: 'Organization 5',
		description: 'This is the description for Organization 5',
		location: 'Location 5'
	},
	{
		id: 6,
		name: 'Organization 6',
		description: 'This is the description for Organization 6',
		location: 'Location 6'
	},
	{
		id: 7,
		name: 'Organization 7',
		description: 'This is the description for Organization 7',
		location: 'Location 7'
	},
	{
		id: 8,
		name: 'Organization 8',
		description: 'This is the description for Organization 8',
		location: 'Location 8'
	},
	{
		id: 9,
		name: 'Organization 9',
		description: 'This is the description for Organization 9',
		location: 'Location 9'
	},
	{
		id: 10,
		name: 'Organization 10',
		description: 'This is the description for Organization 10',
		location: 'Location 10'
	},
	{
		id: 11,
		name: 'Organization 11',
		description: 'This is the description for Organization 11',
		location: 'Location 11'
	},
	{
		id: 12,
		name: 'Organization 12',
		description: 'This is the description for Organization 12',
		location: 'Location 12'
	},
	{
		id: 13,
		name: 'Organization 13',
		description: 'This is the description for Organization 13',
		location: 'Location 13'
	},
	{
		id: 14,
		name: 'Organization 14',
		description: 'This is the description for Organization 14',
		location: 'Location 14'
	}
];

export const tasks: Task[] = Array.from(
	{ length: 10 },
	(_, index) => ({
		id: index + 1,
		title: `Task ${index + 1}`,
		description: `This is the description for Task ${index + 1}`,
		organizationId: index + 1 // Assuming each task is associated with a corresponding organization by ID
	})
);

export default organizations;
