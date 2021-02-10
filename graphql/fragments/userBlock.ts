import { gql } from "@apollo/client";

export const userBlockFragmentNode = gql`
  fragment UserBlockFragment on User {
    id
    name
    slug
    initials
    avatar(size: LARGE)
  }
`;
