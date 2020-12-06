

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileSsr
// ====================================================

export interface ProfileSsr_identity_identifiable_Group {}

export interface ProfileSsr_identity_identifiable_User_counts {
  channels: number | null;
  followers: number | null;
  following: number | null;
}

export interface ProfileSsr_identity_identifiable_User_channels_counts {
  contents: number | null;
}

export interface ProfileSsr_identity_identifiable_User_channels_owner_Group {
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileSsr_identity_identifiable_User_channels_owner_User {
  id: number | null;
  name: string | null;
}

export type ProfileSsr_identity_identifiable_User_channels_owner = ProfileSsr_identity_identifiable_User_channels_owner_Group | ProfileSsr_identity_identifiable_User_channels_owner_User;

export interface ProfileSsr_identity_identifiable_User_channels {
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: ProfileSsr_identity_identifiable_User_channels_counts | null;
  owner: ProfileSsr_identity_identifiable_User_channels_owner | null;
}

export interface ProfileSsr_identity_identifiable_User {
  id: number | null;
  name: string | null;
  counts: ProfileSsr_identity_identifiable_User_counts | null;
  channels: (ProfileSsr_identity_identifiable_User_channels | null)[] | null;
}

export type ProfileSsr_identity_identifiable = ProfileSsr_identity_identifiable_Group | ProfileSsr_identity_identifiable_User;

export interface ProfileSsr_identity {
  identifiable: ProfileSsr_identity_identifiable;
}

export interface ProfileSsr {
  identity: ProfileSsr_identity | null;
}

export interface ProfileSsrVariables {
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