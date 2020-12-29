

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowing
// ====================================================

export interface UserFollowing_identity_identifiable_Group {
  __typename: "Group";
}

export interface UserFollowing_identity_identifiable_User_following_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  slug: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserFollowing_identity_identifiable_User_following_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface UserFollowing_identity_identifiable_User_following_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface UserFollowing_identity_identifiable_User_following_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type UserFollowing_identity_identifiable_User_following_Channel_owner = UserFollowing_identity_identifiable_User_following_Channel_owner_Group | UserFollowing_identity_identifiable_User_following_Channel_owner_User;

export interface UserFollowing_identity_identifiable_User_following_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
  updated_at: string | null;
  slug: string | null;
  visibility: string | null;
  counts: UserFollowing_identity_identifiable_User_following_Channel_counts | null;
  owner: UserFollowing_identity_identifiable_User_following_Channel_owner | null;
}

export interface UserFollowing_identity_identifiable_User_following_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
}

export type UserFollowing_identity_identifiable_User_following = UserFollowing_identity_identifiable_User_following_User | UserFollowing_identity_identifiable_User_following_Channel | UserFollowing_identity_identifiable_User_following_Group;

export interface UserFollowing_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  following: (UserFollowing_identity_identifiable_User_following | null)[] | null;
}

export type UserFollowing_identity_identifiable = UserFollowing_identity_identifiable_Group | UserFollowing_identity_identifiable_User;

export interface UserFollowing_identity {
  __typename: "Identity";
  identifiable: UserFollowing_identity_identifiable;
}

export interface UserFollowing {
  identity: UserFollowing_identity | null;
}

export interface UserFollowingVariables {
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