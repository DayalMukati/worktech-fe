/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation loginUser($walletAddress: String!) {\n    loginUser(input: { walletAddress: $walletAddress }) {\n      user {\n        _id\n        userRoles {\n          _id\n        }\n        skills {\n          _id\n          title\n        }\n        firstName\n        lastName\n        status\n      }\n      token\n      isProfileCreated\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation registerUser($input: CreateUserInput!) {\n    registerUser(input: $input) {\n      user {\n       email\n      }\n      token\n      isProfileCreated\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation CreateTask($input:  TasksInput!) {\n    createTask(input: $input) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n": types.CreateTaskDocument,
    "\n  mutation UpdateTask($_id: String!, $input:  UpdateTasksInput!) {\n    updateTask(_id: $_id, input: $input) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n": types.UpdateTaskDocument,
    "\n  query GetUserByToken {\n    getUserByToken {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUserByTokenDocument,
    "\n  query GetTask($_id: String!) {\n    getTask(_id: $_id) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n": types.GetTaskDocument,
    "\n\tquery ListAllSkills {\n\t  listAllSkills {\n\t\t _id\n\t\t title\n\t\t description\n\t\t status\n\t  }\n\t}\n ": types.ListAllSkillsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation loginUser($walletAddress: String!) {\n    loginUser(input: { walletAddress: $walletAddress }) {\n      user {\n        _id\n        userRoles {\n          _id\n        }\n        skills {\n          _id\n          title\n        }\n        firstName\n        lastName\n        status\n      }\n      token\n      isProfileCreated\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($walletAddress: String!) {\n    loginUser(input: { walletAddress: $walletAddress }) {\n      user {\n        _id\n        userRoles {\n          _id\n        }\n        skills {\n          _id\n          title\n        }\n        firstName\n        lastName\n        status\n      }\n      token\n      isProfileCreated\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation registerUser($input: CreateUserInput!) {\n    registerUser(input: $input) {\n      user {\n       email\n      }\n      token\n      isProfileCreated\n    }\n  }\n"): (typeof documents)["\n  mutation registerUser($input: CreateUserInput!) {\n    registerUser(input: $input) {\n      user {\n       email\n      }\n      token\n      isProfileCreated\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTask($input:  TasksInput!) {\n    createTask(input: $input) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTask($input:  TasksInput!) {\n    createTask(input: $input) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTask($_id: String!, $input:  UpdateTasksInput!) {\n    updateTask(_id: $_id, input: $input) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTask($_id: String!, $input:  UpdateTasksInput!) {\n    updateTask(_id: $_id, input: $input) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByToken {\n    getUserByToken {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUserByToken {\n    getUserByToken {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTask($_id: String!) {\n    getTask(_id: $_id) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n"): (typeof documents)["\n  query GetTask($_id: String!) {\n    getTask(_id: $_id) {\n      _id\n      name\n      description\n      priority\n      amount\n      activities {\n        userId\n        activity\n        createdAt\n      }\n      reviewer {\n        _id\n      }\n      assinees {\n        _id\n      }\n      skills {\n        _id\n      }\n      acceptanceCriteria\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery ListAllSkills {\n\t  listAllSkills {\n\t\t _id\n\t\t title\n\t\t description\n\t\t status\n\t  }\n\t}\n "): (typeof documents)["\n\tquery ListAllSkills {\n\t  listAllSkills {\n\t\t _id\n\t\t title\n\t\t description\n\t\t status\n\t  }\n\t}\n "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;