/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  activity: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type ActivityInput = {
  activity: Scalars['String']['input'];
  createdAt: Scalars['DateTime']['input'];
  userId: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  status: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profilePic?: InputMaybe<Scalars['String']['input']>;
  signupMode?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['ID']['input']>>;
  status: Scalars['Float']['input'];
  userRoles?: InputMaybe<Array<Scalars['ID']['input']>>;
  walletAddress: Scalars['String']['input'];
};

export type InterestedContributorsDto = {
  __typename?: 'InterestedContributorsDto';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
  taskID: TaskDto;
  userID: UserDto;
};

export type InterestedContributorsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['Int']['input'];
  taskID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};

export type InviteAdminUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
};

export type InviteAdminUserOutput = {
  __typename?: 'InviteAdminUserOutput';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  mobile?: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
  token: Scalars['String']['output'];
  userRoles: Array<RoleDto>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  isProfileCreated?: Maybe<Scalars['Boolean']['output']>;
  otp?: Maybe<Scalars['Int']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserDto>;
};

export type LoginUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdminPermission: User;
  createInterestedContributor: InterestedContributorsDto;
  createOrg: Orgs;
  createRole: Roles;
  createSkill: Skills;
  createSpace: Spaces;
  createTask: Tasks;
  createUser: User;
  inviteAdminUser: InviteAdminUserOutput;
  loginUser: LoginResult;
  registerUser: LoginResult;
  removeAdminPermission: User;
  resetPassword: User;
  updateInterestedContributor: InterestedContributorsDto;
  updateOrg: Orgs;
  updateSkill: Skills;
  updateSpace: Spaces;
  updateTask: Tasks;
  updateUser: User;
  verifyAdminUser: User;
  verifyOtp: LoginResult;
};


export type MutationAddAdminPermissionArgs = {
  email: Scalars['String']['input'];
};


export type MutationCreateInterestedContributorArgs = {
  input: InterestedContributorsInput;
};


export type MutationCreateOrgArgs = {
  input: OrgsInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationCreateSkillArgs = {
  input: SkillsInput;
};


export type MutationCreateSpaceArgs = {
  input: SpacesInput;
};


export type MutationCreateTaskArgs = {
  input: TasksInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationInviteAdminUserArgs = {
  input: InviteAdminUserInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  input: CreateUserInput;
};


export type MutationRemoveAdminPermissionArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateInterestedContributorArgs = {
  _id: Scalars['String']['input'];
  input: UpdateInterestedContributorsInput;
};


export type MutationUpdateOrgArgs = {
  _id: Scalars['String']['input'];
  input: UpdateOrgsInput;
};


export type MutationUpdateSkillArgs = {
  _id: Scalars['String']['input'];
  input: UpdateSkillsInput;
};


export type MutationUpdateSpaceArgs = {
  _id: Scalars['String']['input'];
  input: UpdateSpacesInput;
};


export type MutationUpdateTaskArgs = {
  _id: Scalars['String']['input'];
  input: UpdateTasksInput;
};


export type MutationUpdateUserArgs = {
  email: Scalars['String']['input'];
  fieldsToUpdate: UpdateUserInput;
};


export type MutationVerifyAdminUserArgs = {
  input: VerifyAdminUserInput;
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type Orgs = {
  __typename?: 'Orgs';
  _id: Scalars['ID']['output'];
  contributors?: Maybe<Array<UserDto>>;
  createdBy?: Maybe<UserDto>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  reviewers?: Maybe<Array<UserDto>>;
  roles?: Maybe<Array<RoleDto>>;
  spaces?: Maybe<Array<SpaceDto>>;
  status: Scalars['Float']['output'];
};

export type OrgsInput = {
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  reviewers?: InputMaybe<Array<Scalars['ID']['input']>>;
  roles?: InputMaybe<Array<Scalars['ID']['input']>>;
  spaces?: InputMaybe<Array<Scalars['ID']['input']>>;
  status: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  findOneByEmail: User;
  forgotPassword: Scalars['Boolean']['output'];
  getInterestedContributor: InterestedContributorsDto;
  getOrg: Orgs;
  getRole: Roles;
  getSkill: Skills;
  getSpace: Spaces;
  getTask: Tasks;
  getUserByToken: User;
  listAllInterestedContributors: Array<InterestedContributorsDto>;
  listAllOrgs: Array<Orgs>;
  listAllOrgsByUser: Array<Orgs>;
  listAllRoles: Array<Roles>;
  listAllSkills: Array<Skills>;
  listAllSpaces: Array<Spaces>;
  listAllTasks: Array<Tasks>;
  profile: User;
  refreshToken: Scalars['String']['output'];
  user: User;
  users: Array<User>;
  verifyEntityUser: Scalars['String']['output'];
};


export type QueryFindOneByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetInterestedContributorArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetOrgArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetRoleArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetSkillArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetSpaceArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetTaskArgs = {
  _id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  email: Scalars['String']['input'];
};


export type QueryVerifyEntityUserArgs = {
  token: Scalars['String']['input'];
};

export type RoleDto = {
  __typename?: 'RoleDto';
  _id: Scalars['ID']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  status: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type Roles = {
  __typename?: 'Roles';
  _id: Scalars['ID']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  status: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type SkillDto = {
  __typename?: 'SkillDto';
  _id: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  status: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Skills = {
  __typename?: 'Skills';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  status: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type SkillsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type SpaceDto = {
  __typename?: 'SpaceDto';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status: Scalars['Int']['output'];
  tasks?: Maybe<Array<TaskDto>>;
  visibility?: Maybe<Scalars['String']['output']>;
};

export type Spaces = {
  __typename?: 'Spaces';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status: Scalars['Float']['output'];
  tasks?: Maybe<Array<TaskDto>>;
  visibility?: Maybe<Scalars['String']['output']>;
};

export type SpacesInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  status: Scalars['Int']['input'];
  tasks?: InputMaybe<Array<Scalars['ID']['input']>>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type TaskDto = {
  __typename?: 'TaskDto';
  _id: Scalars['ID']['output'];
  acceptanceCriteria?: Maybe<Scalars['String']['output']>;
  activities?: Maybe<Array<Activity>>;
  amount?: Maybe<Scalars['String']['output']>;
  assinees?: Maybe<Array<UserDto>>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  priority?: Maybe<Scalars['String']['output']>;
  reviewer?: Maybe<Array<UserDto>>;
  skills?: Maybe<Array<SkillDto>>;
  status: Scalars['Int']['output'];
};

export type Tasks = {
  __typename?: 'Tasks';
  _id: Scalars['ID']['output'];
  acceptanceCriteria?: Maybe<Scalars['String']['output']>;
  activities?: Maybe<Array<Activity>>;
  amount?: Maybe<Scalars['String']['output']>;
  assinees?: Maybe<Array<UserDto>>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  priority?: Maybe<Scalars['String']['output']>;
  reviewer?: Maybe<UserDto>;
  skills?: Maybe<Array<SkillDto>>;
  status: Scalars['Int']['output'];
};

export type TasksInput = {
  acceptanceCriteria?: InputMaybe<Scalars['String']['input']>;
  activities?: InputMaybe<Array<ActivityInput>>;
  amount: Scalars['String']['input'];
  assinees?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  reviewer: Array<Scalars['ID']['input']>;
  skills?: InputMaybe<Array<Scalars['ID']['input']>>;
  status: Scalars['Int']['input'];
};

export type UpdateInterestedContributorsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  taskID?: InputMaybe<Scalars['ID']['input']>;
  userID?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOrgsInput = {
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reviewers?: InputMaybe<Array<Scalars['ID']['input']>>;
  roles?: InputMaybe<Array<Scalars['ID']['input']>>;
  spaces?: InputMaybe<Array<Scalars['ID']['input']>>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdateSkillsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSpacesInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  tasks?: InputMaybe<Array<Scalars['ID']['input']>>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTasksInput = {
  acceptanceCriteria?: InputMaybe<Scalars['String']['input']>;
  activities: Array<ActivityInput>;
  amount: Scalars['String']['input'];
  assinees?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  reviewer: Array<Scalars['ID']['input']>;
  skills?: InputMaybe<Array<Scalars['ID']['input']>>;
  status: Scalars['Int']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<UpdatePasswordInput>;
  profilePic?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  profilePic?: Maybe<Scalars['String']['output']>;
  signupMode?: Maybe<Scalars['String']['output']>;
  skills?: Maybe<Array<SkillDto>>;
  status: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userRoles?: Maybe<Array<RoleDto>>;
  walletAddress: Scalars['String']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  profilePic?: Maybe<Scalars['String']['output']>;
  signupMode?: Maybe<Scalars['String']['output']>;
  skills?: Maybe<Array<SkillDto>>;
  status: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userRoles?: Maybe<Array<RoleDto>>;
  walletAddress: Scalars['String']['output'];
};

export type VerifyAdminUserInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type VerifyOtpInput = {
  mobile: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type LoginUserMutationVariables = Exact<{
  walletAddress: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResult', token?: string | null, isProfileCreated?: boolean | null, user?: { __typename?: 'UserDto', _id: string, firstName?: string | null, lastName?: string | null, status: number, userRoles?: Array<{ __typename?: 'RoleDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string, title: string }> | null } | null } };

export type RegisterUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'LoginResult', token?: string | null, isProfileCreated?: boolean | null, user?: { __typename?: 'UserDto', email: string } | null } };


export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"isProfileCreated"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"isProfileCreated"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;