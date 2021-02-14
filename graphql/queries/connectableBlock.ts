import { gql, TypedDocumentNode } from "@apollo/client";
import { channelBlockFragmentNode } from "../fragments/channelBlock";
import { embedBlockFragmentNode } from "../fragments/embedBlock";
import { imageBlockFragmentNode } from "../fragments/imageBlock";
import { linkBlockFragmentNode } from "../fragments/linkBlock";
import { textBlockFragmentNode } from "../fragments/textBlock";

export const connectableBlockQueryNode: TypedDocumentNode = gql`
  query ConnectableBlockQuery($id: ID!, $typename: String!) {
    blokk(id: $id) {
      ...TextBlockFragment
      ...ImageBlockFragment
      ...LinkBlockFragment
      ...ChannelBlockFragment
      ...EmbedBlockFragment
    }
    clientMetadata(metadata: $typename) @client
  }
  ${textBlockFragmentNode},
  ${imageBlockFragmentNode},
  ${linkBlockFragmentNode},
  ${channelBlockFragmentNode},
  ${embedBlockFragmentNode}
`;
