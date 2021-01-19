import { gql } from "@apollo/client";
import { userCardFragmentNode } from "../fragments/UserCardFragment";

export const userCardQueryNode = gql`
  query UserCardQuery($id: ID!) {
    user(id: $id) {
      ...UserCardFragment
    }
  }
  ${userCardFragmentNode}
`;
