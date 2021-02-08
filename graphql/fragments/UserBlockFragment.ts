import gql from "graphql-tag";

export const userBlockFragmentNode = gql`
  fragment UserBlockFragment on User {
    id
    name
    slug
    initials
    avatar(size: LARGE)
  }
`;
