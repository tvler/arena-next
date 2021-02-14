import { gql } from "@apollo/client";

export const linkBlockFragmentNode = gql`
  fragment LinkBlockFragment on Link {
    id
    image_url(size: DISPLAY)
  }
`;
