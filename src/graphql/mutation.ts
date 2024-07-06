import { gql } from './__generated__';

// common
export const LOGIN_USER_WITH_WALLET = gql(`
  mutation loginUser($walletAddress: String!) {
    loginUser(input: { walletAddress: $walletAddress }) {
      user {
        _id
        email
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
       _id
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

 

export const CREATE_SPACE_MUTATION = gql(`
  mutation CreateSpace($input: SpacesInput!) {
    createSpace(input: $input) {
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

export const UPDATE_SPACE_MUTATION = gql(`
  mutation UpdateSpace($_id: String!, $input: UpdateSpacesInput!) {
    updateSpace(_id: $_id, input: $input) {
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

export const CREATE_ORG_MUTATION = gql(`
  mutation CreateOrg($input: OrgsInput!) {
    createOrg(input: $input) {
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
export const UPDATE_ORG_MUTATION = gql(`
  mutation UpdateOrg($_id: String!, $input: UpdateOrgsInput!) {
    updateOrg(_id: $_id, input: $input) {
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
export const UPDATE_USER_MUTATION = gql(`
  mutation UpdateUser($_id: String!, $input: UpdateInput!) {
    updateUser(_id: $_id, input: $input) {
       _id
     mobile
    gender
    status
    signupMode
    profilePic
    linkedIn
    twitter
    discord
    github
    bio
    createdAt
    updatedAt
    }
  }
`);
