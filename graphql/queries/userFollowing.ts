import { gql } from "@apollo/client";
import { userBlockFragmentNode } from "../fragments/UserBlockFragment";
import { channelBlockFragmentNode } from "../fragments/ChannelBlockFragment";
import { groupBlockFragmentNode } from "../fragments/GroupBlockFragment";

export const userFollowingQueryNode = gql`
  query UserFollowingQuery($id: ID!, $page: Int!, $per: Int!) {
    identity(id: $id) {
      identifiable {
        ... on User {
          id
          following(page: $page, per: $per) {
            ... on User {
              ...UserBlockFragment
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
  ${userBlockFragmentNode},
  ${channelBlockFragmentNode}
  ${groupBlockFragmentNode}
`;
