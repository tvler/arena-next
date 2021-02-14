import { gql, TypedDocumentNode } from "@apollo/client";
import { imageBlockFragmentNode } from "../fragments/imageBlock";
import { textBlockFragmentNode } from "../fragments/textBlock";

export const connectableBlockQueryNode: TypedDocumentNode = gql`
  query ConnectableBlockQuery($id: ID!, $typename: String!) {
    blokk(id: $id) {
      ...TextBlockFragment
      ...ImageBlockFragment
    }
    clientMetadata(metadata: $typename) @client
  }
  ${textBlockFragmentNode},
  ${imageBlockFragmentNode}
`;
