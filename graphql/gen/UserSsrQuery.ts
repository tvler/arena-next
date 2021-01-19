

/* tslint:disable */
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

export interface UserSsrQuery_identity_identifiable_User_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface UserSsrQuery_identity_identifiable_User_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface UserSsrQuery_identity_identifiable_User_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type UserSsrQuery_identity_identifiable_User_channels_owner = UserSsrQuery_identity_identifiable_User_channels_owner_Group | UserSsrQuery_identity_identifiable_User_channels_owner_User;

export interface UserSsrQuery_identity_identifiable_User_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: UserSsrQuery_identity_identifiable_User_channels_counts | null;
  owner: UserSsrQuery_identity_identifiable_User_channels_owner | null;
}

export interface UserSsrQuery_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  bio: string | null;
  counts: UserSsrQuery_identity_identifiable_User_counts | null;
  channels: (UserSsrQuery_identity_identifiable_User_channels | null)[] | null;
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

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================