import { gql } from "@apollo/client";

export const userSsrQueryNode = gql`
  query UserSsrQuery($id: ID!) {
    identity(id: $id) {
      identifiable {
        ... on User {
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
    }
  }
`;
