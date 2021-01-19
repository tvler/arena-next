import gql from "graphql-tag";

export const groupBlockFragmentNode = gql`
  fragment GroupBlockFragment on Group {
    id
    name
    href
    visibility
  }
`;
