/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConnectableBlockQuery
// ====================================================

export interface ConnectableBlockQuery_blokk_Embed {
  __typename: "Embed" | "Attachment" | "PendingBlock";
}

export interface ConnectableBlockQuery_blokk_Text {
  __typename: "Text";
  id: number | null;
  content: string | null;
}

export interface ConnectableBlockQuery_blokk_Image {
  __typename: "Image";
  id: number | null;
  image_url: string | null;
}

export interface ConnectableBlockQuery_blokk_Link {
  __typename: "Link";
  id: number | null;
  image_url: string | null;
}

export interface ConnectableBlockQuery_blokk_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ConnectableBlockQuery_blokk_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ConnectableBlockQuery_blokk_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ConnectableBlockQuery_blokk_Channel_owner = ConnectableBlockQuery_blokk_Channel_owner_Group | ConnectableBlockQuery_blokk_Channel_owner_User;

export interface ConnectableBlockQuery_blokk_Channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
  updated_at: string | null;
  slug: string | null;
  visibility: string | null;
  counts: ConnectableBlockQuery_blokk_Channel_counts | null;
  owner: ConnectableBlockQuery_blokk_Channel_owner | null;
}

export type ConnectableBlockQuery_blokk = ConnectableBlockQuery_blokk_Embed | ConnectableBlockQuery_blokk_Text | ConnectableBlockQuery_blokk_Image | ConnectableBlockQuery_blokk_Link | ConnectableBlockQuery_blokk_Channel;

export interface ConnectableBlockQuery {
  blokk: ConnectableBlockQuery_blokk | null;
  clientMetadata: string | null;
}

export interface ConnectableBlockQueryVariables {
  id: string;
  typename: string;
}
