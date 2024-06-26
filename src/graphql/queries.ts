import { gql } from './__generated__';


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

export const LIST_ALL_TASKS_QUERY = gql(`
  query ListAllTasks {
    listAllTasks {
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

export const LIST_ALL_SPACES_QUERY = gql(`
  query ListAllSpaces {
    listAllSpaces {
      _id
      name
      description
      visibility
      tasks {
        _id
      }
      status
    }
  }
`);

export const GET_SPACE_QUERY = gql(`
  query GetSpace($_id: String!) {
    getSpace(_id: $_id) {
      _id
      name
      description
      visibility
      tasks {
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
      status
    }
  }
`);

export const GET_ALL_TASKS_BY_SPACE_ID_QUERY = gql(`
  query GetAllTasksBySpaceId($_id: String!) {
    getAllTasksBySpaceId(_id: $_id) {
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


