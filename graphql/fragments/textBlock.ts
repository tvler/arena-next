import { gql } from "@apollo/client";

export const textBlockFragmentNode = gql`
  fragment TextBlockFragment on Konnectable {
    ... on Model {
      id
    }

    ... on Text {
      content(format: HTML)
    }
  }
`;
