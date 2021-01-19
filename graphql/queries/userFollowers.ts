import { gql } from "@apollo/client";
import { userCardFragmentNode } from "../fragments/UserCardFragment";

export const userFollowersQueryNode = gql`
  query UserFollowersQuery($id: ID!, $page: Int!, $per: Int!) {
    identity(id: $id) {
      identifiable {
        ... on User {
          id
          followers(page: $page, per: $per) {
            ...UserCardFragment
          }
        }
      }
    }
  }
  ${userCardFragmentNode}
`;
