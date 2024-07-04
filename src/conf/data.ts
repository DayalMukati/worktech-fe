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
		description: 'Blockchain Network',
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

export const DEFAULT_CARDS = [
	// BACKLOG
	{
		title: 'Debug Dashboard Rendering Issue Bounty',
		id: '1',
		column: 'todo',
		createdAt: '2days ago',
		tags: ['Debugging', 'UI', 'Dashboard']
	},
	{
		title: 'Complete SOX Compliance Checklist Bounty',
		id: '2',
		column: 'todo',
		createdAt: '2days ago',
		tags: ['Compliance', 'SOX', 'Checklist']
	},
	{
		title: 'Azure Migration Feasibility Study Bounty',
		id: '3',
		column: 'todo',
		createdAt: '2days ago',
		tags: ['Azure', 'Migration', 'Feasibility Study']
	},
	{
		title: 'Notifications Service Documentation Bounty',
		id: '4',
		column: 'todo',
		createdAt: '2days ago',
		tags: ['Documentation', 'Notifications', 'Service']
	},
	// TODO
	{
		title: 'Database Options Research for Microservice Bounty',
		id: '5',
		column: 'todo',
		createdAt: '2days ago',
		tags: ['Database', 'Research', 'Microservice']
	},
	{
		title: 'Outage Postmortem Analysis Bounty',
		id: '6',
		column: 'todo',
		createdAt: '2days ago',
		tags: ['Outage', 'Postmortem', 'Analysis']
	},
	{
		title: 'Q3 Roadmap Collaboration Bounty',
		id: '7',
		column: 'todo',
		createdAt: '2days ago',
		tags: ['Roadmap', 'Collaboration', 'Q3']
	},

	// DOING
	{
		title:
			'Zustand Integration for Context Management Refactoring Bounty',
		id: '8',
		column: 'in-progress',
		createdAt: '2days ago',
		tags: ['Zustand', 'Context Management', 'Refactoring']
	},
	{
		title: 'Daily CRON Logging Enhancement Bounty',
		id: '9',
		column: 'in-review',
		createdAt: '2days ago',
		tags: ['CRON', 'Logging', 'Enhancement']
	},
	// DONE
	{
		title: 'Lambda Listener DD Dashboards Setup Bounty',
		id: '10',
		column: 'done',
		createdAt: '2days ago',
		tags: ['Lambda', 'Dashboards', 'Setup']
	}
];

export default organizations;

export const spaces = [
	{
		name: 'Community Contributions',
		visibility: false
		// tasks: ["Task 1", "Task 2", "Task 3"],
	},
	{
		name: 'Developer challenges',
		visibility: false
	}
];

export const TASK_STATUS = {
	TODO: 0,
	ASSIGNED: 1,
	IN_PROGRESS: 2,
	REVIEW: 3,
	COMPLETED: 4,
	REJECT: 5
};
