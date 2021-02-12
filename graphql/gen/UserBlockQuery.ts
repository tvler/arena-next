/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserBlockQuery
// ====================================================

export interface UserBlockQuery_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  slug: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserBlockQuery {
  /**
   * A single user
   */
  user: UserBlockQuery_user | null;
}

export interface UserBlockQueryVariables {
  id: string;
}
