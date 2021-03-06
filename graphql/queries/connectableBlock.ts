import { gql, TypedDocumentNode } from "@apollo/client";
import { attachmentBlockFragmentNode } from "../fragments/attachmentBlock";
import { channelBlockFragmentNode } from "../fragments/channelBlock";
import { embedBlockFragmentNode } from "../fragments/embedBlock";
import { imageBlockFragmentNode } from "../fragments/imageBlock";
import { linkBlockFragmentNode } from "../fragments/linkBlock";
import { pendingBlockFragmentNode } from "../fragments/pendingBlock";
import { textBlockFragmentNode } from "../fragments/textBlock";

export const connectableBlockQueryNode: TypedDocumentNode = gql`
  query ConnectableBlockQuery($id: ID!, $typename: String!) {
    blokk(id: $id) {
      ...TextBlockFragment
      ...ImageBlockFragment
      ...LinkBlockFragment
      ...ChannelBlockFragment
      ...EmbedBlockFragment
      ...AttachmentBlockFragment
      ...PendingBlockFragment
    }
    clientMetadata(metadata: $typename) @client
  }
  ${textBlockFragmentNode}
  ${imageBlockFragmentNode}
  ${linkBlockFragmentNode}
  ${channelBlockFragmentNode}
  ${embedBlockFragmentNode}
  ${attachmentBlockFragmentNode}
  ${pendingBlockFragmentNode}
`;
