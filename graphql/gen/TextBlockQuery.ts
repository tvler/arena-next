

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TextBlockQuery
// ====================================================

export interface TextBlockQuery_blokk_Channel {
  __typename: "Channel" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
}

export interface TextBlockQuery_blokk_Text {
  __typename: "Text";
  id: number | null;
  content: string | null;
}

export type TextBlockQuery_blokk = TextBlockQuery_blokk_Channel | TextBlockQuery_blokk_Text;

export interface TextBlockQuery {
  blokk: TextBlockQuery_blokk | null;
}

export interface TextBlockQueryVariables {
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