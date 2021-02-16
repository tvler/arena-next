import { gql } from "@apollo/client";

export const pendingBlockFragmentNode = gql`
  fragment PendingBlockFragment on PendingBlock {
    id
  }
`;
