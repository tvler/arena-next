import { gql } from "@apollo/client";
import { userBlockFragmentNode } from "../fragments/userBlock";
import { channelBlockFragmentNode } from "../fragments/channelBlock";
import { groupBlockFragmentNode } from "../fragments/groupBlock";

export const userFollowingQueryNode = gql`
  query UserFollowingQuery($id: ID!, $page: Int!, $per: Int!) {
    user(id: $id) {
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
  ${userBlockFragmentNode}
  ${channelBlockFragmentNode}
  ${groupBlockFragmentNode}
`;
