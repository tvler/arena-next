import { gql } from "@apollo/client";

export const imageBlockFragmentNode = gql`
  fragment ImageBlockFragment on Image {
    id
    image_url(size: DISPLAY)
    title
  }
`;
