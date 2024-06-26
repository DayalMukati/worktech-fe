import { gql } from "./__generated__";

// common
export const LOGIN_USER_WITH_WALLET = gql(`
  mutation loginUser($walletAddress: String!) {
    loginUser(input: { walletAddress: $walletAddress }) {
      user {
        _id
        userRoles {
          _id
        }
        skills {
          _id
          title
        }
        firstName
        lastName
        status
      }
      token
      isProfileCreated
    }
  }
`);

export const REGISTER_USER = gql(`
  mutation registerUser($input: CreateUserInput!) {
    registerUser(input: $input) {
      user {
       email
      }
      token
      isProfileCreated
    }
  }
`);

export const CREATE_TASK_MUTATION = gql(`
  mutation CreateTask($input:  TasksInput!) {
    createTask(input: $input) {
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

export const UPDATE_TASK_MUTATION = gql(`
  mutation UpdateTask($_id: String!, $input:  UpdateTasksInput!) {
    updateTask(_id: $_id, input: $input) {
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

export const GET_USER_BY_TOKEN = gql(`
  query GetUserByToken {
    getUserByToken {
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
