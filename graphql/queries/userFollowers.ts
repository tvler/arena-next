import { gql } from "@apollo/client";
import userCardFragment from "../fragments/UserCardFragment";

const userFollowers = gql`
  query UserFollowers($id: ID!, $page: Int!, $per: Int!) {
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
  ${userCardFragment}
`;

export default userFollowers;
