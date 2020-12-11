import { gql, TypedDocumentNode } from "@apollo/client";
import { ProfileSsr, ProfileSsrVariables } from "../gen/ProfileSsr";

const userSsr: TypedDocumentNode<ProfileSsr, ProfileSsrVariables> = gql`
  query ProfileSsr($id: ID!) {
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
          channels(page: 1, per: 5, sort_by: UPDATED_AT) {
            id
            href
            truncatedTitle: title(truncate: 80)
            visibility
            updated_at(relative: true)
            counts {
              contents
            }
            owner {
              ... on Group {
                id
                name
                visibility
              }
              ... on User {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default userSsr;
