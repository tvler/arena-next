

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TextBlockFragment
// ====================================================

export interface TextBlockFragment_Channel {
  __typename: "Channel" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
}

export interface TextBlockFragment_Text {
  __typename: "Text";
  id: number | null;
  content: string | null;
}

export type TextBlockFragment = TextBlockFragment_Channel | TextBlockFragment_Text;

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================