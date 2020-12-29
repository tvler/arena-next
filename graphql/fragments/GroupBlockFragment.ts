import gql from "graphql-tag";

export const groupBlockFragment = gql`
  fragment GroupBlockFragment on Group {
    id
    name
    href
    visibility
  }
`;

export default groupBlockFragment;
