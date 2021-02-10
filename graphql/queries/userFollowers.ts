import { gql } from "@apollo/client";
import { userBlockFragmentNode } from "../fragments/userBlock";

export const userFollowersQueryNode = gql`
  query UserFollowersQuery($id: ID!, $page: Int!, $per: Int!) {
    identity(id: $id) {
      identifiable {
        ... on User {
          id
          followers(page: $page, per: $per) {
            ...UserBlockFragment
          }
        }
      }
    }
  }
  ${userBlockFragmentNode}
`;
