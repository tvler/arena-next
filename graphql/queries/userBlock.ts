import { gql } from "@apollo/client";
import { userBlockFragmentNode } from "../fragments/userBlock";

export const userBlockQueryNode = gql`
  query UserBlockQuery($id: ID!) {
    user(id: $id) {
      ...UserBlockFragment
    }
  }
  ${userBlockFragmentNode}
`;
