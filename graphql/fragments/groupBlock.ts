import { gql } from "@apollo/client";

export const groupBlockFragmentNode = gql`
  fragment GroupBlockFragment on Group {
    id
    name
    href
    visibility
  }
`;
