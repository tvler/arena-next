/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserSsrQuery
// ====================================================

export interface UserSsrQuery_identity_identifiable_Group {
  __typename: "Group";
}

export interface UserSsrQuery_identity_identifiable_User_counts {
  __typename: "UserCounts";
  channels: number | null;
  blocks: number | null;
  followers: number | null;
  following: number | null;
}

export interface UserSsrQuery_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  bio: string | null;
  counts: UserSsrQuery_identity_identifiable_User_counts | null;
}

export type UserSsrQuery_identity_identifiable = UserSsrQuery_identity_identifiable_Group | UserSsrQuery_identity_identifiable_User;

export interface UserSsrQuery_identity {
  __typename: "Identity";
  identifiable: UserSsrQuery_identity_identifiable;
}

export interface UserSsrQuery {
  identity: UserSsrQuery_identity | null;
}

export interface UserSsrQueryVariables {
  id: string;
}
