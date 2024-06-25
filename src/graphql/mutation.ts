import { gql } from './__generated__';

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
