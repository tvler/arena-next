import { gql } from "@apollo/client";
import channelBlockFragment from "../fragments/ChannelBlockFragment";

const channelBlock = gql`
  query ChannelBlock($id: ID!) {
    channel(id: $id) {
      ...ChannelBlockFragment
    }
  }
  ${channelBlockFragment}
`;

export default channelBlock;
