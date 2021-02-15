import { gql } from "@apollo/client";

export const userSsrQueryNode = gql`
  query UserSsrQuery($id: ID!) {
    user(id: $id) {
      id
      name
      bio(format: HTML)
      counts {
        channels
        blocks
        followers
        following
      }
    }
  }
`;
