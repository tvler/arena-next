/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelBlock
// ====================================================

export interface ChannelBlock_channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelBlock_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ChannelBlock_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ChannelBlock_channel_owner =
  | ChannelBlock_channel_owner_Group
  | ChannelBlock_channel_owner_User;

export interface ChannelBlock_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
  updated_at: string | null;
  slug: string | null;
  visibility: string | null;
  counts: ChannelBlock_channel_counts | null;
  owner: ChannelBlock_channel_owner | null;
}

export interface ChannelBlock {
  channel: ChannelBlock_channel | null; // A single channel
}

export interface ChannelBlockVariables {
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
