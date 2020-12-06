import { gql, TypedDocumentNode } from "@apollo/client";
import { ProfileSsr, ProfileSsrVariables } from "../gen/ProfileSsr";

const profileSsr: TypedDocumentNode<ProfileSsr, ProfileSsrVariables> = gql`
  query ProfileSsr($id: ID!) {
    identity(id: $id) {
      identifiable {
        ... on User {
          id
          name
          counts {
            channels
            followers
            following
          }
          channels(page: 1, per: 1, sort_by: UPDATED_AT) {
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

export default profileSsr;
