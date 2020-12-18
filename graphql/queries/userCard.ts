import { gql } from "@apollo/client";
import userCardFragment from "../fragments/UserCardFragment";

const userCard = gql`
  query UserCard($id: ID!) {
    user(id: $id) {
      ...UserCardFragment
    }
  }
  ${userCardFragment}
`;

export default userCard;
