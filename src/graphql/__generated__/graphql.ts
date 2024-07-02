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
  activity?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
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

export type LeaderboardData = {
  __typename?: 'LeaderboardData';
  amountEarned: Scalars['Float']['output'];
  taskCount: Scalars['Int']['output'];
  taskPoints: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type LeaderboardResponse = {
  __typename?: 'LeaderboardResponse';
  contributionData: Array<LeaderboardData>;
  reviewData: Array<LeaderboardData>;
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
  createOrg: OrgDto;
  createRole: Roles;
  createSkill: Skills;
  createSpace: SpaceDto;
  createTask: Tasks;
  createUser: User;
  inviteAdminUser: InviteAdminUserOutput;
  loginUser: LoginResult;
  registerUser: LoginResult;
  removeAdminPermission: User;
  resetPassword: User;
  updateInterestedContributor: InterestedContributorsDto;
  updateOrg: OrgDto;
  updateSkill: Skills;
  updateSpace: SpaceDto;
  updateTask: Tasks;
  updateUser: User;
  updateUserByEmail: User;
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
  _id: Scalars['String']['input'];
  input: UpdateInput;
};


export type MutationUpdateUserByEmailArgs = {
  email: Scalars['String']['input'];
  fieldsToUpdate: UpdateUserInput;
};


export type MutationVerifyAdminUserArgs = {
  input: VerifyAdminUserInput;
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type OrgDto = {
  __typename?: 'OrgDto';
  _id: Scalars['ID']['output'];
  contributors?: Maybe<Array<UserDto>>;
  createdBy: UserDto;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  reviewers?: Maybe<Array<UserDto>>;
  roles?: Maybe<Array<RoleDto>>;
  skills?: Maybe<SkillDto>;
  spaces?: Maybe<Array<SpaceDto>>;
  status: Scalars['Int']['output'];
};

export type OrgsInput = {
  contributors?: InputMaybe<Array<Scalars['ID']['input']>>;
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  reviewers?: InputMaybe<Array<Scalars['ID']['input']>>;
  roles?: InputMaybe<Array<Scalars['ID']['input']>>;
  skills?: InputMaybe<Array<Scalars['ID']['input']>>;
  spaces?: InputMaybe<Array<Scalars['ID']['input']>>;
  status: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  findOneByEmail: User;
  forgotPassword: Scalars['Boolean']['output'];
  getAllSpacesByOrgId: Array<SpaceDto>;
  getAllTasksByAssineeId: Array<Tasks>;
  getAllTasksBySpaceId: Array<Tasks>;
  getInterestedContributor: InterestedContributorsDto;
  getLeaderboard: LeaderboardResponse;
  getOrg: OrgDto;
  getRole: Roles;
  getSkill: Skills;
  getSpace: SpaceDto;
  getTask: Tasks;
  getUserByToken: User;
  listAllInterestedContributors: Array<InterestedContributorsDto>;
  listAllOrgs: Array<OrgDto>;
  listAllOrgsByUser: Array<OrgDto>;
  listAllRoles: Array<Roles>;
  listAllSkills: Array<Skills>;
  listAllSpaces: Array<SpaceDto>;
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


export type QueryGetAllSpacesByOrgIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetAllTasksByAssineeIdArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetAllTasksBySpaceIdArgs = {
  _id: Scalars['String']['input'];
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
  org?: Maybe<OrgDto>;
  status: Scalars['Int']['output'];
  tasks?: Maybe<Array<TaskDto>>;
  visibility?: Maybe<Scalars['String']['output']>;
};

export type SpacesInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  org?: InputMaybe<Scalars['ID']['input']>;
  status: Scalars['Int']['input'];
  tasks?: InputMaybe<Array<Scalars['ID']['input']>>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type TaskData = {
  __typename?: 'TaskData';
  taskAmount?: Maybe<Array<Scalars['Float']['output']>>;
  taskCount?: Maybe<Scalars['Int']['output']>;
};

export type TaskDataDto = {
  __typename?: 'TaskDataDto';
  taskAmount?: Maybe<Array<Scalars['Float']['output']>>;
  taskCount?: Maybe<Scalars['Int']['output']>;
};

export type TaskDto = {
  __typename?: 'TaskDto';
  _id: Scalars['ID']['output'];
  acceptanceCriteria?: Maybe<Scalars['String']['output']>;
  activities?: Maybe<Array<Activity>>;
  amount?: Maybe<Scalars['Float']['output']>;
  assinees?: Maybe<Array<UserDto>>;
  description?: Maybe<Scalars['String']['output']>;
  docUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  priority?: Maybe<Scalars['String']['output']>;
  reviewer?: Maybe<UserDto>;
  skills?: Maybe<Array<SkillDto>>;
  space?: Maybe<SpaceDto>;
  status: Scalars['Int']['output'];
  taskId?: Maybe<Scalars['Float']['output']>;
};

export type Tasks = {
  __typename?: 'Tasks';
  _id: Scalars['ID']['output'];
  acceptanceCriteria?: Maybe<Scalars['String']['output']>;
  activities?: Maybe<Array<Activity>>;
  amount?: Maybe<Scalars['Float']['output']>;
  assinees?: Maybe<Array<UserDto>>;
  description?: Maybe<Scalars['String']['output']>;
  docUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  priority?: Maybe<Scalars['String']['output']>;
  reviewer?: Maybe<UserDto>;
  skills?: Maybe<Array<SkillDto>>;
  space?: Maybe<SpaceDto>;
  status: Scalars['Int']['output'];
  taskId?: Maybe<Scalars['Float']['output']>;
};

export type TasksInput = {
  acceptanceCriteria?: InputMaybe<Scalars['String']['input']>;
  activities?: InputMaybe<Array<ActivityInput>>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  assinees?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  docUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['String']['input']>;
  reviewer?: InputMaybe<Scalars['ID']['input']>;
  skills?: InputMaybe<Array<Scalars['ID']['input']>>;
  space?: InputMaybe<Scalars['ID']['input']>;
  status: Scalars['Int']['input'];
  taskId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profilePic?: InputMaybe<Scalars['String']['input']>;
  signupMode?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['ID']['input']>>;
  status?: InputMaybe<Scalars['Float']['input']>;
  userRoles?: InputMaybe<Array<Scalars['ID']['input']>>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
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
  org?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  tasks?: InputMaybe<Array<Scalars['ID']['input']>>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTasksInput = {
  acceptanceCriteria?: InputMaybe<Scalars['String']['input']>;
  activities?: InputMaybe<Array<ActivityInput>>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  assinees?: InputMaybe<Array<Scalars['ID']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  docUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  reviewer?: InputMaybe<Scalars['ID']['input']>;
  skills?: InputMaybe<Array<Scalars['ID']['input']>>;
  space?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  taskId?: InputMaybe<Scalars['Float']['input']>;
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
  contributedTasks?: Maybe<TaskData>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  profilePic?: Maybe<Scalars['String']['output']>;
  reviewedTasks?: Maybe<TaskData>;
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
  contributedTasks?: Maybe<TaskDataDto>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  profilePic?: Maybe<Scalars['String']['output']>;
  reviewedTasks?: Maybe<TaskDataDto>;
  signupMode?: Maybe<Scalars['String']['output']>;
  skills?: Maybe<Array<SkillDto>>;
  status: Scalars['Int']['output'];
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


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResult', token?: string | null, isProfileCreated?: boolean | null, user?: { __typename?: 'UserDto', _id: string, email: string, firstName?: string | null, lastName?: string | null, status: number, userRoles?: Array<{ __typename?: 'RoleDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string, title: string }> | null } | null } };

export type RegisterUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'LoginResult', token?: string | null, isProfileCreated?: boolean | null, user?: { __typename?: 'UserDto', _id: string, email: string } | null } };

export type CreateTaskMutationVariables = Exact<{
  input: TasksInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Tasks', _id: string, name: string, description?: string | null, priority?: string | null, amount?: number | null, acceptanceCriteria?: string | null, status: number, activities?: Array<{ __typename?: 'Activity', userId: string, activity: string, createdAt: any }> | null, reviewer?: { __typename?: 'UserDto', _id: string } | null, assinees?: Array<{ __typename?: 'UserDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string }> | null } };

export type UpdateTaskMutationVariables = Exact<{
  _id: Scalars['String']['input'];
  input: UpdateTasksInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Tasks', _id: string, name: string, description?: string | null, priority?: string | null, amount?: number | null, acceptanceCriteria?: string | null, status: number, activities?: Array<{ __typename?: 'Activity', userId: string, activity: string, createdAt: any }> | null, reviewer?: { __typename?: 'UserDto', _id: string } | null, assinees?: Array<{ __typename?: 'UserDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string }> | null } };

export type GetUserByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByTokenQuery = { __typename?: 'Query', getUserByToken: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, email: string, gender?: string | null, mobile?: string | null, signupMode?: string | null, status: number, profilePic?: string | null, walletAddress: string, createdAt: any, updatedAt: any, userRoles?: Array<{ __typename?: 'RoleDto', _id: string, title: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string, title: string }> | null } };

export type CreateSpaceMutationVariables = Exact<{
  input: SpacesInput;
}>;


export type CreateSpaceMutation = { __typename?: 'Mutation', createSpace: { __typename?: 'SpaceDto', _id: string, name: string, description?: string | null, visibility?: string | null, status: number, tasks?: Array<{ __typename?: 'TaskDto', _id: string }> | null } };

export type UpdateSpaceMutationVariables = Exact<{
  _id: Scalars['String']['input'];
  input: UpdateSpacesInput;
}>;


export type UpdateSpaceMutation = { __typename?: 'Mutation', updateSpace: { __typename?: 'SpaceDto', _id: string, name: string, description?: string | null, visibility?: string | null, status: number, tasks?: Array<{ __typename?: 'TaskDto', _id: string }> | null } };

export type CreateOrgMutationVariables = Exact<{
  input: OrgsInput;
}>;


export type CreateOrgMutation = { __typename?: 'Mutation', createOrg: { __typename?: 'OrgDto', _id: string, name: string, description?: string | null, status: number, reviewers?: Array<{ __typename?: 'UserDto', _id: string }> | null, contributors?: Array<{ __typename?: 'UserDto', _id: string }> | null, spaces?: Array<{ __typename?: 'SpaceDto', _id: string }> | null, roles?: Array<{ __typename?: 'RoleDto', _id: string }> | null, createdBy: { __typename?: 'UserDto', _id: string } } };

export type UpdateOrgMutationVariables = Exact<{
  _id: Scalars['String']['input'];
  input: UpdateOrgsInput;
}>;


export type UpdateOrgMutation = { __typename?: 'Mutation', updateOrg: { __typename?: 'OrgDto', _id: string, name: string, description?: string | null, status: number, reviewers?: Array<{ __typename?: 'UserDto', _id: string }> | null, contributors?: Array<{ __typename?: 'UserDto', _id: string }> | null, spaces?: Array<{ __typename?: 'SpaceDto', _id: string }> | null, roles?: Array<{ __typename?: 'RoleDto', _id: string }> | null, createdBy: { __typename?: 'UserDto', _id: string } } };

export type ListAllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllSkillsQuery = { __typename?: 'Query', listAllSkills: Array<{ __typename?: 'Skills', _id: string, title: string, description?: string | null, status: number }> };

export type ListAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllTasksQuery = { __typename?: 'Query', listAllTasks: Array<{ __typename?: 'Tasks', _id: string, name: string, description?: string | null, priority?: string | null, amount?: number | null, acceptanceCriteria?: string | null, status: number, activities?: Array<{ __typename?: 'Activity', userId: string, activity: string, createdAt: any }> | null, reviewer?: { __typename?: 'UserDto', _id: string } | null, assinees?: Array<{ __typename?: 'UserDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string }> | null }> };

export type GetAllTasksBySpaceIdQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetAllTasksBySpaceIdQuery = { __typename?: 'Query', getAllTasksBySpaceId: Array<{ __typename?: 'Tasks', _id: string, name: string, description?: string | null, priority?: string | null, amount?: number | null, acceptanceCriteria?: string | null, status: number, activities?: Array<{ __typename?: 'Activity', userId: string, activity: string, createdAt: any }> | null, reviewer?: { __typename?: 'UserDto', _id: string } | null, space?: { __typename?: 'SpaceDto', _id: string, name: string } | null, assinees?: Array<{ __typename?: 'UserDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string, title: string }> | null }> };

export type GetOrgQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetOrgQuery = { __typename?: 'Query', getOrg: { __typename?: 'OrgDto', _id: string, name: string, description?: string | null, status: number, reviewers?: Array<{ __typename?: 'UserDto', _id: string }> | null, contributors?: Array<{ __typename?: 'UserDto', _id: string }> | null, spaces?: Array<{ __typename?: 'SpaceDto', _id: string }> | null, roles?: Array<{ __typename?: 'RoleDto', _id: string }> | null, createdBy: { __typename?: 'UserDto', _id: string } } };

export type ListAllOrgsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllOrgsQuery = { __typename?: 'Query', listAllOrgs: Array<{ __typename?: 'OrgDto', _id: string, name: string, description?: string | null, status: number, reviewers?: Array<{ __typename?: 'UserDto', _id: string }> | null, contributors?: Array<{ __typename?: 'UserDto', _id: string }> | null, spaces?: Array<{ __typename?: 'SpaceDto', _id: string }> | null, roles?: Array<{ __typename?: 'RoleDto', _id: string }> | null, createdBy: { __typename?: 'UserDto', _id: string } }> };

export type ListAllOrgsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllOrgsByUserQuery = { __typename?: 'Query', listAllOrgsByUser: Array<{ __typename?: 'OrgDto', _id: string, name: string, status: number }> };

export type GetSpaceQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetSpaceQuery = { __typename?: 'Query', getSpace: { __typename?: 'SpaceDto', _id: string, name: string, description?: string | null, visibility?: string | null, status: number, tasks?: Array<{ __typename?: 'TaskDto', _id: string, name: string, description?: string | null, priority?: string | null, amount?: number | null, acceptanceCriteria?: string | null, status: number, activities?: Array<{ __typename?: 'Activity', userId: string, activity: string, createdAt: any }> | null, reviewer?: { __typename?: 'UserDto', _id: string } | null, assinees?: Array<{ __typename?: 'UserDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string }> | null }> | null } };

export type GetAllSpacesByOrgIdQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetAllSpacesByOrgIdQuery = { __typename?: 'Query', getAllSpacesByOrgId: Array<{ __typename?: 'SpaceDto', _id: string, name: string, description?: string | null, visibility?: string | null, status: number, org?: { __typename?: 'OrgDto', _id: string, name: string } | null, tasks?: Array<{ __typename?: 'TaskDto', _id: string, name: string, description?: string | null, priority?: string | null, amount?: number | null, acceptanceCriteria?: string | null, status: number, activities?: Array<{ __typename?: 'Activity', userId: string, activity: string, createdAt: any }> | null, reviewer?: { __typename?: 'UserDto', _id: string } | null, assinees?: Array<{ __typename?: 'UserDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string }> | null }> | null }> };

export type ListAllSpacesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllSpacesQuery = { __typename?: 'Query', listAllSpaces: Array<{ __typename?: 'SpaceDto', _id: string, name: string, description?: string | null, visibility?: string | null, status: number, tasks?: Array<{ __typename?: 'TaskDto', _id: string }> | null }> };

export type GetTaskQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', getTask: { __typename?: 'Tasks', _id: string, name: string, taskId?: number | null, description?: string | null, priority?: string | null, docUrl?: string | null, amount?: number | null, acceptanceCriteria?: string | null, status: number, activities?: Array<{ __typename?: 'Activity', userId: string, activity: string, createdAt: any }> | null, space?: { __typename?: 'SpaceDto', _id: string } | null, reviewer?: { __typename?: 'UserDto', _id: string } | null, assinees?: Array<{ __typename?: 'UserDto', _id: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string, title: string }> | null } };

export type ListAllInterestedContributorsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListAllInterestedContributorsQuery = { __typename?: 'Query', listAllInterestedContributors: Array<{ __typename?: 'InterestedContributorsDto', _id: string, description?: string | null, status: number, userID: { __typename?: 'UserDto', _id: string, email: string }, taskID: { __typename?: 'TaskDto', _id: string } }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, email: string, gender?: string | null, mobile?: string | null, signupMode?: string | null, status: number, profilePic?: string | null, walletAddress: string, createdAt: any, updatedAt: any, userRoles?: Array<{ __typename?: 'RoleDto', _id: string, title: string }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string, title: string }> | null }> };

export type GetAllTasksByAssineeIdQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type GetAllTasksByAssineeIdQuery = { __typename?: 'Query', getAllTasksByAssineeId: Array<{ __typename?: 'Tasks', _id: string, name: string, description?: string | null, priority?: string | null, amount?: number | null, acceptanceCriteria?: string | null, status: number, activities?: Array<{ __typename?: 'Activity', userId: string, activity: string, createdAt: any }> | null, reviewer?: { __typename?: 'UserDto', _id: string, firstName?: string | null, lastName?: string | null } | null, assinees?: Array<{ __typename?: 'UserDto', _id: string, firstName?: string | null, lastName?: string | null }> | null, skills?: Array<{ __typename?: 'SkillDto', _id: string, title: string }> | null }> };

export type GetLeaderboardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLeaderboardQuery = { __typename?: 'Query', getLeaderboard: { __typename?: 'LeaderboardResponse', contributionData: Array<{ __typename?: 'LeaderboardData', username: string, taskCount: number, taskPoints: number, amountEarned: number }>, reviewData: Array<{ __typename?: 'LeaderboardData', username: string, taskCount: number, taskPoints: number, amountEarned: number }> } };


export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"isProfileCreated"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"isProfileCreated"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TasksInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assinees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptanceCriteria"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTasksInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assinees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptanceCriteria"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const GetUserByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"signupMode"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"profilePic"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserByTokenQuery, GetUserByTokenQueryVariables>;
export const CreateSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SpacesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateSpaceMutation, CreateSpaceMutationVariables>;
export const UpdateSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSpacesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateSpaceMutation, UpdateSpaceMutationVariables>;
export const CreateOrgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrgsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reviewers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateOrgMutation, CreateOrgMutationVariables>;
export const UpdateOrgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrgsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reviewers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateOrgMutation, UpdateOrgMutationVariables>;
export const ListAllSkillsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAllSkills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listAllSkills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ListAllSkillsQuery, ListAllSkillsQueryVariables>;
export const ListAllTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAllTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listAllTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assinees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptanceCriteria"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ListAllTasksQuery, ListAllTasksQueryVariables>;
export const GetAllTasksBySpaceIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTasksBySpaceId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTasksBySpaceId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"space"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assinees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptanceCriteria"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetAllTasksBySpaceIdQuery, GetAllTasksBySpaceIdQueryVariables>;
export const GetOrgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reviewers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetOrgQuery, GetOrgQueryVariables>;
export const ListAllOrgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAllOrgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listAllOrgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reviewers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ListAllOrgsQuery, ListAllOrgsQueryVariables>;
export const ListAllOrgsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAllOrgsByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listAllOrgsByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ListAllOrgsByUserQuery, ListAllOrgsByUserQueryVariables>;
export const GetSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assinees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptanceCriteria"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetSpaceQuery, GetSpaceQueryVariables>;
export const GetAllSpacesByOrgIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSpacesByOrgId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllSpacesByOrgId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"org"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assinees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptanceCriteria"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetAllSpacesByOrgIdQuery, GetAllSpacesByOrgIdQueryVariables>;
export const ListAllSpacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAllSpaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listAllSpaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ListAllSpacesQuery, ListAllSpacesQueryVariables>;
export const GetTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"docUrl"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"space"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assinees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptanceCriteria"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetTaskQuery, GetTaskQueryVariables>;
export const ListAllInterestedContributorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAllInterestedContributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listAllInterestedContributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"userID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"taskID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ListAllInterestedContributorsQuery, ListAllInterestedContributorsQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"signupMode"}},{"kind":"Field","name":{"kind":"Name","value":"userRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"profilePic"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetAllTasksByAssineeIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTasksByAssineeId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTasksByAssineeId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"activities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assinees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"acceptanceCriteria"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetAllTasksByAssineeIdQuery, GetAllTasksByAssineeIdQueryVariables>;
 export const GetLeaderboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeaderboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLeaderboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributionData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskPoints"}},{"kind":"Field","name":{"kind":"Name","value":"amountEarned"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviewData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskPoints"}},{"kind":"Field","name":{"kind":"Name","value":"amountEarned"}}]}}]}}]}}]} as unknown as DocumentNode<GetLeaderboardQuery, GetLeaderboardQueryVariables>;