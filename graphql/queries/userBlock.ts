import { gql } from "@apollo/client";
import { userBlockFragmentNode } from "../fragments/UserBlockFragment";

export const userBlockQueryNode = gql`
  query UserBlockQuery($id: ID!) {
    user(id: $id) {
      ...UserBlockFragment
    }
  }
  ${userBlockFragmentNode}
`;
