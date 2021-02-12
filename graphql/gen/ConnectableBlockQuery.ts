/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConnectableBlockQuery
// ====================================================

export interface ConnectableBlockQuery_blokk_Channel {
  __typename: "Channel" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
}

export interface ConnectableBlockQuery_blokk_Text {
  __typename: "Text";
  id: number | null;
  content: string | null;
}

export type ConnectableBlockQuery_blokk = ConnectableBlockQuery_blokk_Channel | ConnectableBlockQuery_blokk_Text;

export interface ConnectableBlockQuery {
  blokk: ConnectableBlockQuery_blokk | null;
  clientMetadata: string | null;
}

export interface ConnectableBlockQueryVariables {
  id: string;
  typename: string;
}
