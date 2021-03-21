import { gql } from "@apollo/client";

export const embedBlockFragmentNode = gql`
  fragment EmbedBlockFragment on Embed {
    id
    image_url(size: DISPLAY)
    title
  }
`;
