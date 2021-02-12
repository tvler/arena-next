import { gql } from "@apollo/client";
import { textBlockFragmentNode } from "../fragments/textBlock";

export const textBlockQueryNode = gql`
  query TextBlockQuery($id: ID!, $type: String!) {
    blokk(id: $id) {
      ...TextBlockFragment
    }
    clientMetadata(metadata: $type) @client
  }
  ${textBlockFragmentNode}
`;
