import { gql } from "@apollo/client";

export const textBlockFragmentNode = gql`
  fragment TextBlockFragment on Text {
    id
    content(format: HTML)
  }
`;
