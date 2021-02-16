/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelContentQuery
// ====================================================

export interface ChannelContentQuery_channel_blokks_Text {
  __typename: "Text";
  id: number | null;
  content: string | null;
}

export interface ChannelContentQuery_channel_blokks_Image {
  __typename: "Image";
  id: number | null;
  image_url: string | null;
}

export interface ChannelContentQuery_channel_blokks_Link {
  __typename: "Link";
  id: number | null;
  image_url: string | null;
}

export interface ChannelContentQuery_channel_blokks_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelContentQuery_channel_blokks_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ChannelContentQuery_channel_blokks_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ChannelContentQuery_channel_blokks_Channel_owner = ChannelContentQuery_channel_blokks_Channel_owner_Group | ChannelContentQuery_channel_blokks_Channel_owner_User;

export interface ChannelContentQuery_channel_blokks_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
  updated_at: string | null;
  slug: string | null;
  visibility: string | null;
  counts: ChannelContentQuery_channel_blokks_Channel_counts | null;
  owner: ChannelContentQuery_channel_blokks_Channel_owner | null;
}

export interface ChannelContentQuery_channel_blokks_Embed {
  __typename: "Embed";
  id: number | null;
  image_url: string | null;
}

export interface ChannelContentQuery_channel_blokks_Attachment {
  __typename: "Attachment";
  id: number | null;
  title: string | null;
}

export interface ChannelContentQuery_channel_blokks_PendingBlock {
  __typename: "PendingBlock";
  id: number | null;
}

export type ChannelContentQuery_channel_blokks = ChannelContentQuery_channel_blokks_Text | ChannelContentQuery_channel_blokks_Image | ChannelContentQuery_channel_blokks_Link | ChannelContentQuery_channel_blokks_Channel | ChannelContentQuery_channel_blokks_Embed | ChannelContentQuery_channel_blokks_Attachment | ChannelContentQuery_channel_blokks_PendingBlock;

export interface ChannelContentQuery_channel {
  __typename: "Channel";
  id: number | null;
  blokks: (ChannelContentQuery_channel_blokks | null)[] | null;
}

export interface ChannelContentQuery {
  /**
   * A single channel
   */
  channel: ChannelContentQuery_channel | null;
}

export interface ChannelContentQueryVariables {
  id: string;
  page: number;
  per: number;
}
