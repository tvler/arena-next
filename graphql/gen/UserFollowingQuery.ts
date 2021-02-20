/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowingQuery
// ====================================================

export interface UserFollowingQuery_user_following_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  slug: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserFollowingQuery_user_following_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface UserFollowingQuery_user_following_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface UserFollowingQuery_user_following_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type UserFollowingQuery_user_following_Channel_owner = UserFollowingQuery_user_following_Channel_owner_Group | UserFollowingQuery_user_following_Channel_owner_User;

export interface UserFollowingQuery_user_following_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
  updated_at: string | null;
  slug: string | null;
  visibility: string | null;
  counts: UserFollowingQuery_user_following_Channel_counts | null;
  owner: UserFollowingQuery_user_following_Channel_owner | null;
}

export interface UserFollowingQuery_user_following_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
}

export type UserFollowingQuery_user_following = UserFollowingQuery_user_following_User | UserFollowingQuery_user_following_Channel | UserFollowingQuery_user_following_Group;

export interface UserFollowingQuery_user {
  __typename: "User";
  id: number | null;
  following: (UserFollowingQuery_user_following | null)[] | null;
}

export interface UserFollowingQuery {
  /**
   * A single user
   */
  user: UserFollowingQuery_user | null;
}

export interface UserFollowingQueryVariables {
  id: string;
  page: number;
  per: number;
}
