import { gql, TypedDocumentNode } from "@apollo/client";
import { channelBlockFragmentNode } from "../fragments/channelBlock";
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
    }
    clientMetadata(metadata: $typename) @client
  }
  ${textBlockFragmentNode},
  ${imageBlockFragmentNode},
  ${linkBlockFragmentNode},
  ${channelBlockFragmentNode}
`;
