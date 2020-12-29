import { gql } from "@apollo/client";
import userCardFragment from "../fragments/UserCardFragment";
import channelBlockFragment from "../fragments/ChannelBlockFragment";
import groupBlockFragment from "../fragments/GroupBlockFragment";

const userFollowing = gql`
  query UserFollowing($id: ID!, $page: Int!, $per: Int!) {
    identity(id: $id) {
      identifiable {
        ... on User {
          id
          following(page: $page, per: $per) {
            ... on User {
              ...UserCardFragment
            }
            ... on Channel {
              ...ChannelBlockFragment
            }
            ... on Group {
              ...GroupBlockFragment
            }
          }
        }
      }
    }
  }
  ${userCardFragment},
  ${channelBlockFragment}
  ${groupBlockFragment}
`;

export default userFollowing;
