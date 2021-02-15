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

export interface ChannelSsrQuery_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  description: string | null;
  counts: ChannelSsrQuery_channel_counts | null;
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
