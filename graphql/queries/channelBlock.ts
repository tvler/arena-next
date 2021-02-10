import { gql } from "@apollo/client";
import { channelBlockFragmentNode } from "../fragments/channelBlock";

export const channelBlockQueryNode = gql`
  query ChannelBlockQuery($id: ID!) {
    channel(id: $id) {
      ...ChannelBlockFragment
    }
  }
  ${channelBlockFragmentNode}
`;
