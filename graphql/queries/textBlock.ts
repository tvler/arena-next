import { gql } from "@apollo/client";
import { textBlockFragmentNode } from "../fragments/textBlock";

export const textBlockQueryNode = gql`
  query TextBlockQuery($id: ID!) {
    blokk(id: $id) {
      ...TextBlockFragment
    }
  }
  ${textBlockFragmentNode}
`;
