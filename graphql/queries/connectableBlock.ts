import { gql, TypedDocumentNode } from "@apollo/client";
import { textBlockFragmentNode } from "../fragments/textBlock";

export const connectableBlockQueryNode: TypedDocumentNode = gql`
  query ConnectableBlockQuery($id: ID!, $typename: String!) {
    blokk(id: $id) {
      ...TextBlockFragment
    }
    clientMetadata(metadata: $typename) @client
  }
  ${textBlockFragmentNode}
`;
