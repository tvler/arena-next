/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowersQuery
// ====================================================

export interface UserFollowersQuery_user_followers {
  __typename: "User";
  id: number | null;
  name: string | null;
  slug: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserFollowersQuery_user {
  __typename: "User";
  id: number | null;
  followers: (UserFollowersQuery_user_followers | null)[] | null;
}

export interface UserFollowersQuery {
  /**
   * A single user
   */
  user: UserFollowersQuery_user | null;
}

export interface UserFollowersQueryVariables {
  id: string;
  page: number;
  per: number;
}
