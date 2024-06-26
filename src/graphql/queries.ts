import { gql } from './__generated__';
export const GET_TASK_QUERY = gql(`
  query GetTask($_id: String!) {
    getTask(_id: $_id) {
      _id
      name
      description
      priority
      amount
      activities {
        userId
        activity
        createdAt
      }
      reviewer {
        _id
      }
      assinees {
        _id
      }
      skills {
        _id
      }
      acceptanceCriteria
      status
    }
  }
`);

export const LIST_ALL_SKILLS = gql(`
	query ListAllSkills {
	  listAllSkills {
		 _id
		 title
		 description
		 status
	  }
	}
 `);
