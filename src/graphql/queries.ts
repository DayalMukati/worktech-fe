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

export const GET_USER_BY_TOKEN = gql(`
  query GetUserByToken {
    getUserByToken {
      _id
      firstName
      lastName
      email
      gender
      mobile
      bio
      signupMode
      userRoles {
        _id
        title
      }
      status
      profilePic
      walletAddress
      skills {
        _id
        title
      }
      createdAt
      updatedAt
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
export const GET_ALL_TASKS_BY_SPACE_ID_QUERY = gql(`
  query GetAllTasksBySpaceId($_id: String!) {
    getAllTasksBySpaceId(_id: $_id) {
      _id
      name
      description
      priority
      amount
      docUrl
      taskId
      activities {
        userId
        activity
        createdAt
      }
      reviewer {
        _id
      }
      space {
        _id
        name
      }
      assinees {
        _id
        email
      }
      skills {
        _id
        title
     
      }
      acceptanceCriteria
      status
    }
  }
`);

export const GET_ORG_QUERY = gql(`
  query GetOrg($_id: String!) {
    getOrg(_id: $_id) {
      _id
      name
      description
      reviewers {
        _id
      }
      contributors {
        _id
      }
      spaces {
        _id
      }
      roles {
        _id
      }
      createdBy {
        _id
      }
      status
    }
  }
`);
export const LIST_ALL_ORGS_QUERY = gql(`
  query ListAllOrgs {
    listAllOrgs {
      _id
      name
      description
      reviewers {
        _id
      }
      contributors {
        _id
      }
      spaces {
        _id
      }
      roles {
        _id
      }
      createdBy {
        _id
      }
      status
    }
  }
`);
export const LIST_ALL_ORGS_BY_USER_QUERY = gql(`
  query ListAllOrgsByUser {
    listAllOrgsByUser {
      _id
      name
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
export const GET_ALL_SPACES_BY_ORG_ID_QUERY = gql(`
  query GetAllSpacesByOrgId($_id: String!) {
    getAllSpacesByOrgId(_id: $_id) {
      _id
      name
      description
      visibility
      org {
        _id
        name
      }
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

export const GET_TASK_QUERY = gql(`
  query GetTask($_id: String!) {
    getTask(_id: $_id) {
      _id
      name
      taskId
      description
      priority
      docUrl
      amount
      activities {
        userId
        activity
        createdAt
      }
      space {
        _id
      }
      reviewer {
        _id
      }
      assinees {
        _id
      }
      skills {
        _id
        title
      }
      acceptanceCriteria
      status
    }
  }
`);
export const LIST_ALL_INTERESTED_CONTRIBUTORS = gql(`
  query ListAllInterestedContributors {
    listAllInterestedContributors {
      _id
      description
      userID{
          _id
          email
      }
      taskID{
          _id
      }
      status
    }
  }
  `);

export const GET_USERS_QUERY = gql(`
  query GetUsers {
    users {
      _id
      firstName
      lastName
      email
      gender
      mobile
      signupMode
      userRoles {
        _id
        title
      }
      status
      profilePic
      walletAddress
      skills {
        _id
        title
      }
      createdAt
      updatedAt
    }
  }
`);

export const GET_ALL_TASKS_BY_ASSINEE_ID_QUERY = gql(`
  query GetAllTasksByAssineeId($_id: String!) {
    getAllTasksByAssineeId(_id: $_id) {
       _id
    name
    description
    priority
    amount
    taskId
    activities{
        userId
        activity
        createdAt
    }
    reviewer{
        _id
        firstName
        lastName
    }
    assinees{
        _id
        firstName
        lastName
    }
    skills{
        _id
        title
    }
    acceptanceCriteria
    status
    }
  }
`);

export const GET_LEADERBOARD_DATA = gql(`
    query GetLeaderboard {
  getLeaderboard {
    contributionData {
       username
       taskCount
       taskPoints
       amountEarned
    }
    reviewData {
       username
       taskCount
      taskPoints
      amountEarned
    }
  }
}`);
