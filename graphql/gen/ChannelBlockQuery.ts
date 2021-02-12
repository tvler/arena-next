/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelBlockQuery
// ====================================================

export interface ChannelBlockQuery_channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelBlockQuery_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ChannelBlockQuery_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ChannelBlockQuery_channel_owner = ChannelBlockQuery_channel_owner_Group | ChannelBlockQuery_channel_owner_User;

export interface ChannelBlockQuery_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
  updated_at: string | null;
  slug: string | null;
  visibility: string | null;
  counts: ChannelBlockQuery_channel_counts | null;
  owner: ChannelBlockQuery_channel_owner | null;
}

export interface ChannelBlockQuery {
  /**
   * A single channel
   */
  channel: ChannelBlockQuery_channel | null;
}

export interface ChannelBlockQueryVariables {
  id: string;
}
