import { gql } from "@apollo/client";

export const channelSsrQueryNode = gql`
  query ChannelSsrQuery($id: ID!) {
    channel(id: $id) {
      id
      title
      description(format: HTML, no_links: false)
      counts {
        followers
        contents
      }
    }
  }
`;
