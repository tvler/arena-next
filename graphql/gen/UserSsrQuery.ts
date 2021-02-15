/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserSsrQuery
// ====================================================

export interface UserSsrQuery_user_counts {
  __typename: "UserCounts";
  channels: number | null;
  blocks: number | null;
  followers: number | null;
  following: number | null;
}

export interface UserSsrQuery_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  bio: string | null;
  counts: UserSsrQuery_user_counts | null;
}

export interface UserSsrQuery {
  /**
   * A single user
   */
  user: UserSsrQuery_user | null;
}

export interface UserSsrQueryVariables {
  id: string;
}
