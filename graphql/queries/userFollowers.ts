import { gql } from "@apollo/client";
import { userBlockFragmentNode } from "../fragments/userBlock";

export const userFollowersQueryNode = gql`
  query UserFollowersQuery($id: ID!, $page: Int!, $per: Int!) {
    user(id: $id) {
      id
      followers(page: $page, per: $per) {
        ...UserBlockFragment
      }
    }
  }
  ${userBlockFragmentNode}
`;
