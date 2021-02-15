import { gql } from "@apollo/client";

export const attachmentBlockFragmentNode = gql`
  fragment AttachmentBlockFragment on Attachment {
    id
    title
  }
`;
