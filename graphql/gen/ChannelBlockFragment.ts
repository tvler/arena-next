

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelBlockFragment
// ====================================================

export interface ChannelBlockFragment_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelBlockFragment_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ChannelBlockFragment_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ChannelBlockFragment_owner = ChannelBlockFragment_owner_Group | ChannelBlockFragment_owner_User;

export interface ChannelBlockFragment {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  href: string | null;
  updated_at: string | null;
  slug: string | null;
  visibility: string | null;
  counts: ChannelBlockFragment_counts | null;
  owner: ChannelBlockFragment_owner | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================