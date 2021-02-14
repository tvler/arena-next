import { gql, TypedDocumentNode } from "@apollo/client";
import { imageBlockFragmentNode } from "../fragments/imageBlock";
import { linkBlockFragmentNode } from "../fragments/linkBlock";
import { textBlockFragmentNode } from "../fragments/textBlock";

export const connectableBlockQueryNode: TypedDocumentNode = gql`
  query ConnectableBlockQuery($id: ID!, $typename: String!) {
    blokk(id: $id) {
      ...TextBlockFragment
      ...ImageBlockFragment
      ...LinkBlockFragment
    }
    clientMetadata(metadata: $typename) @client
  }
  ${textBlockFragmentNode},
  ${imageBlockFragmentNode},
  ${linkBlockFragmentNode}
`;
