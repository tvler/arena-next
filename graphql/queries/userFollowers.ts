import { gql } from "@apollo/client";

const userSsr = gql`
  query UserFollowers($id: ID!, $page: Int!, $per: Int!) {
    identity(id: $id) {
      identifiable {
        ... on User {
          id
          followers(page: $page, per: $per) {
            id
            name
            href
            initials
            avatar(size: LARGE)
          }
        }
      }
    }
  }
`;

export default userSsr;
