import gql from "graphql-tag";

export const userCardFragmentNode = gql`
  fragment UserCardFragment on User {
    id
    name
    slug
    initials
    avatar(size: LARGE)
  }
`;
