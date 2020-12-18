import gql from "graphql-tag";

export const userCardFragment = gql`
  fragment UserCardFragment on User {
    id
    name
    href
    initials
    avatar(size: LARGE)
  }
`;

export default userCardFragment;
