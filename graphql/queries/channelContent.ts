import { gql } from "@apollo/client";
import { attachmentBlockFragmentNode } from "../fragments/attachmentBlock";
import { channelBlockFragmentNode } from "../fragments/channelBlock";
import { embedBlockFragmentNode } from "../fragments/embedBlock";
import { imageBlockFragmentNode } from "../fragments/imageBlock";
import { linkBlockFragmentNode } from "../fragments/linkBlock";
import { pendingBlockFragmentNode } from "../fragments/pendingBlock";
import { textBlockFragmentNode } from "../fragments/textBlock";

export const channelContentQueryNode = gql`
  query ChannelContentQuery($id: ID!, $page: Int!, $per: Int!) {
    channel(id: $id) {
      id
      blokks(page: $page, per: $per, direction: DESC) {
        ...TextBlockFragment
        ...ImageBlockFragment
        ...LinkBlockFragment
        ...ChannelBlockFragment
        ...EmbedBlockFragment
        ...AttachmentBlockFragment
        ...PendingBlockFragment
      }
    }
  }
  ${textBlockFragmentNode}
  ${imageBlockFragmentNode}
  ${linkBlockFragmentNode}
  ${channelBlockFragmentNode}
  ${embedBlockFragmentNode}
  ${attachmentBlockFragmentNode}
  ${pendingBlockFragmentNode}
`;
