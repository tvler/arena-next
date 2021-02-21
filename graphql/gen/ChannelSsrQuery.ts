/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelSsrQuery
// ====================================================

export interface ChannelSsrQuery_channel_counts {
  __typename: "ChannelCounts";
  followers: number | null;
  contents: number | null;
}

export interface ChannelSsrQuery_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  slug: string | null;
}

export interface ChannelSsrQuery_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type ChannelSsrQuery_channel_owner = ChannelSsrQuery_channel_owner_User | ChannelSsrQuery_channel_owner_Group;

export interface ChannelSsrQuery_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  description: string | null;
  visibility: string | null;
  counts: ChannelSsrQuery_channel_counts | null;
  owner: ChannelSsrQuery_channel_owner | null;
}

export interface ChannelSsrQuery {
  /**
   * A single channel
   */
  channel: ChannelSsrQuery_channel | null;
}

export interface ChannelSsrQueryVariables {
  id: string;
}
