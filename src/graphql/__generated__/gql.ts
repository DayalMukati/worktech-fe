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
    "\n\tquery ListAllSkills {\n\t  listAllSkills {\n\t\t _id\n\t\t title\n\t\t description\n\t\t status\n\t  }\n\t}\n ": types.ListAllSkillsDocument,
    "\n  query GetUserByToken {\n    getUserByToken {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUserByTokenDocument,
    "\n  query ListAllTasks {\n    listAllTasks {\n       _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    space{\n        _id\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n": types.ListAllTasksDocument,
    "\n  query GetAllTasksBySpaceId($_id: String!) {\n    getAllTasksBySpaceId(_id: $_id) {\n     _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    space{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n": types.GetAllTasksBySpaceIdDocument,
    "\n  query GetOrg($_id: String!) {\n    getOrg(_id: $_id) {\n       _id\n    name\n    description\n    reviewers{\n        _id\n    }\n    contributors{\n        _id\n    }\n    status\n    }\n  }\n": types.GetOrgDocument,
    "\n  query ListAllOrgs {\n    listAllOrgs {\n       _id\n    name\n    description\n    reviewers{\n        _id\n    }\n    contributors{\n        _id\n    }\n    roles{\n        _id\n    }\n    createdBy{\n        _id\n    }\n    status\n    }\n  }\n": types.ListAllOrgsDocument,
    "\n  query ListAllOrgsByUser {\n    listAllOrgsByUser {\n    _id\n    name\n    description\n    reviewers{\n        _id\n        walletAddress\n    }\n    contributors{\n        _id\n    }\n    roles{\n        _id\n    }\n    createdBy{\n        _id\n    }\n    status\n    }\n  }\n": types.ListAllOrgsByUserDocument,
    "\n  query GetSpace($_id: String!) {\n    getSpace(_id: $_id) {\n      _id\n    name\n    description\n    visibility\n    org{\n        _id\n    }\n    status\n    }\n  }\n": types.GetSpaceDocument,
    "\n  query GetAllSpacesByOrgId($_id: String!) {\n    getAllSpacesByOrgId(_id: $_id) {\n       _id\n    name\n    description\n    visibility\n    org{\n        _id\n        name\n    }\n    status\n    }\n  }\n": types.GetAllSpacesByOrgIdDocument,
    "\n  query ListAllSpaces {\n    listAllSpaces {\n      _id\n    name\n    description\n    visibility\n    org{\n        _id\n    }\n    status\n    }\n  }\n": types.ListAllSpacesDocument,
    "\n  query GetTask($_id: String!) {\n    getTask(_id: $_id) {\n      _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    space{\n        _id\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n": types.GetTaskDocument,
    "\n  query ListAllInterestedContributors {\n    listAllInterestedContributors {\n      _id\n      description\n      userID{\n          _id\n      }\n      taskID{\n          _id\n      }\n      status\n    }\n  }\n  ": types.ListAllInterestedContributorsDocument,
    "\n  query GetUsers {\n    users {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUsersDocument,
    "\n  query GetAllTasksByAssineeId($_id: String!) {\n    getAllTasksByAssineeId(_id: $_id) {\n       _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n": types.GetAllTasksByAssineeIdDocument,
    "\n    query GetLeaderboard {\n  getLeaderboard {\n    contributionData {\n      name\n      taskCount\n      taskPoints\n      amountEarned\n    }\n    reviewData {\n      name\n      taskCount\n      taskPoints\n      amountEarned\n    }\n  }\n}": types.GetLeaderboardDocument,
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
export function gql(source: "\n\tquery ListAllSkills {\n\t  listAllSkills {\n\t\t _id\n\t\t title\n\t\t description\n\t\t status\n\t  }\n\t}\n "): (typeof documents)["\n\tquery ListAllSkills {\n\t  listAllSkills {\n\t\t _id\n\t\t title\n\t\t description\n\t\t status\n\t  }\n\t}\n "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByToken {\n    getUserByToken {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUserByToken {\n    getUserByToken {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListAllTasks {\n    listAllTasks {\n       _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    space{\n        _id\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n"): (typeof documents)["\n  query ListAllTasks {\n    listAllTasks {\n       _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    space{\n        _id\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllTasksBySpaceId($_id: String!) {\n    getAllTasksBySpaceId(_id: $_id) {\n     _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    space{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n"): (typeof documents)["\n  query GetAllTasksBySpaceId($_id: String!) {\n    getAllTasksBySpaceId(_id: $_id) {\n     _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    space{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetOrg($_id: String!) {\n    getOrg(_id: $_id) {\n       _id\n    name\n    description\n    reviewers{\n        _id\n    }\n    contributors{\n        _id\n    }\n    status\n    }\n  }\n"): (typeof documents)["\n  query GetOrg($_id: String!) {\n    getOrg(_id: $_id) {\n       _id\n    name\n    description\n    reviewers{\n        _id\n    }\n    contributors{\n        _id\n    }\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListAllOrgs {\n    listAllOrgs {\n       _id\n    name\n    description\n    reviewers{\n        _id\n    }\n    contributors{\n        _id\n    }\n    roles{\n        _id\n    }\n    createdBy{\n        _id\n    }\n    status\n    }\n  }\n"): (typeof documents)["\n  query ListAllOrgs {\n    listAllOrgs {\n       _id\n    name\n    description\n    reviewers{\n        _id\n    }\n    contributors{\n        _id\n    }\n    roles{\n        _id\n    }\n    createdBy{\n        _id\n    }\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListAllOrgsByUser {\n    listAllOrgsByUser {\n    _id\n    name\n    description\n    reviewers{\n        _id\n        walletAddress\n    }\n    contributors{\n        _id\n    }\n    roles{\n        _id\n    }\n    createdBy{\n        _id\n    }\n    status\n    }\n  }\n"): (typeof documents)["\n  query ListAllOrgsByUser {\n    listAllOrgsByUser {\n    _id\n    name\n    description\n    reviewers{\n        _id\n        walletAddress\n    }\n    contributors{\n        _id\n    }\n    roles{\n        _id\n    }\n    createdBy{\n        _id\n    }\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSpace($_id: String!) {\n    getSpace(_id: $_id) {\n      _id\n    name\n    description\n    visibility\n    org{\n        _id\n    }\n    status\n    }\n  }\n"): (typeof documents)["\n  query GetSpace($_id: String!) {\n    getSpace(_id: $_id) {\n      _id\n    name\n    description\n    visibility\n    org{\n        _id\n    }\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllSpacesByOrgId($_id: String!) {\n    getAllSpacesByOrgId(_id: $_id) {\n       _id\n    name\n    description\n    visibility\n    org{\n        _id\n        name\n    }\n    status\n    }\n  }\n"): (typeof documents)["\n  query GetAllSpacesByOrgId($_id: String!) {\n    getAllSpacesByOrgId(_id: $_id) {\n       _id\n    name\n    description\n    visibility\n    org{\n        _id\n        name\n    }\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListAllSpaces {\n    listAllSpaces {\n      _id\n    name\n    description\n    visibility\n    org{\n        _id\n    }\n    status\n    }\n  }\n"): (typeof documents)["\n  query ListAllSpaces {\n    listAllSpaces {\n      _id\n    name\n    description\n    visibility\n    org{\n        _id\n    }\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTask($_id: String!) {\n    getTask(_id: $_id) {\n      _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    space{\n        _id\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n"): (typeof documents)["\n  query GetTask($_id: String!) {\n    getTask(_id: $_id) {\n      _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    space{\n        _id\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListAllInterestedContributors {\n    listAllInterestedContributors {\n      _id\n      description\n      userID{\n          _id\n      }\n      taskID{\n          _id\n      }\n      status\n    }\n  }\n  "): (typeof documents)["\n  query ListAllInterestedContributors {\n    listAllInterestedContributors {\n      _id\n      description\n      userID{\n          _id\n      }\n      taskID{\n          _id\n      }\n      status\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsers {\n    users {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      _id\n      firstName\n      lastName\n      email\n      gender\n      mobile\n      signupMode\n      userRoles {\n        _id\n        title\n      }\n      status\n      profilePic\n      walletAddress\n      skills {\n        _id\n        title\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllTasksByAssineeId($_id: String!) {\n    getAllTasksByAssineeId(_id: $_id) {\n       _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n"): (typeof documents)["\n  query GetAllTasksByAssineeId($_id: String!) {\n    getAllTasksByAssineeId(_id: $_id) {\n       _id\n    name\n    description\n    priority\n    amount\n    activities{\n        userId\n        activity\n        createdAt\n    }\n    reviewer{\n        _id\n    }\n    assinees{\n        _id\n    }\n    skills{\n        _id\n    }\n    acceptanceCriteria\n    status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetLeaderboard {\n  getLeaderboard {\n    contributionData {\n      name\n      taskCount\n      taskPoints\n      amountEarned\n    }\n    reviewData {\n      name\n      taskCount\n      taskPoints\n      amountEarned\n    }\n  }\n}"): (typeof documents)["\n    query GetLeaderboard {\n  getLeaderboard {\n    contributionData {\n      name\n      taskCount\n      taskPoints\n      amountEarned\n    }\n    reviewData {\n      name\n      taskCount\n      taskPoints\n      amountEarned\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;