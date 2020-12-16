

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserSsr
// ====================================================

export interface UserSsr_identity_identifiable_Group {
  __typename: "Group";
}

export interface UserSsr_identity_identifiable_User_counts {
  __typename: "UserCounts";
  channels: number | null;
  blocks: number | null;
  followers: number | null;
  following: number | null;
}

export interface UserSsr_identity_identifiable_User_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface UserSsr_identity_identifiable_User_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface UserSsr_identity_identifiable_User_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type UserSsr_identity_identifiable_User_channels_owner = UserSsr_identity_identifiable_User_channels_owner_Group | UserSsr_identity_identifiable_User_channels_owner_User;

export interface UserSsr_identity_identifiable_User_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: UserSsr_identity_identifiable_User_channels_counts | null;
  owner: UserSsr_identity_identifiable_User_channels_owner | null;
}

export interface UserSsr_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  bio: string | null;
  counts: UserSsr_identity_identifiable_User_counts | null;
  channels: (UserSsr_identity_identifiable_User_channels | null)[] | null;
}

export type UserSsr_identity_identifiable = UserSsr_identity_identifiable_Group | UserSsr_identity_identifiable_User;

export interface UserSsr_identity {
  __typename: "Identity";
  identifiable: UserSsr_identity_identifiable;
}

export interface UserSsr {
  identity: UserSsr_identity | null;
}

export interface UserSsrVariables {
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