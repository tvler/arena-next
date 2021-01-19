

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowingQuery
// ====================================================

export interface UserFollowingQuery_identity_identifiable_Group {
  __typename: "Group";
}

export interface UserFollowingQuery_identity_identifiable_User_following_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  slug: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserFollowingQuery_identity_identifiable_User_following_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface UserFollowingQuery_identity_identifiable_User_following_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface UserFollowingQuery_identity_identifiable_User_following_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type UserFollowingQuery_identity_identifiable_User_following_Channel_owner = UserFollowingQuery_identity_identifiable_User_following_Channel_owner_Group | UserFollowingQuery_identity_identifiable_User_following_Channel_owner_User;

export interface UserFollowingQuery_identity_identifiable_User_following_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
  updated_at: string | null;
  slug: string | null;
  visibility: string | null;
  counts: UserFollowingQuery_identity_identifiable_User_following_Channel_counts | null;
  owner: UserFollowingQuery_identity_identifiable_User_following_Channel_owner | null;
}

export interface UserFollowingQuery_identity_identifiable_User_following_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
}

export type UserFollowingQuery_identity_identifiable_User_following = UserFollowingQuery_identity_identifiable_User_following_User | UserFollowingQuery_identity_identifiable_User_following_Channel | UserFollowingQuery_identity_identifiable_User_following_Group;

export interface UserFollowingQuery_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  following: (UserFollowingQuery_identity_identifiable_User_following | null)[] | null;
}

export type UserFollowingQuery_identity_identifiable = UserFollowingQuery_identity_identifiable_Group | UserFollowingQuery_identity_identifiable_User;

export interface UserFollowingQuery_identity {
  __typename: "Identity";
  identifiable: UserFollowingQuery_identity_identifiable;
}

export interface UserFollowingQuery {
  identity: UserFollowingQuery_identity | null;
}

export interface UserFollowingQueryVariables {
  id: string;
  page: number;
  per: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================