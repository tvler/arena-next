import { gql } from "@apollo/client";
import { channelBlockFragmentNode } from "../fragments/ChannelBlockFragment";

export const channelBlockQueryNode = gql`
  query ChannelBlockQuery($id: ID!) {
    channel(id: $id) {
      ...ChannelBlockFragment
    }
  }
  ${channelBlockFragmentNode}
`;
