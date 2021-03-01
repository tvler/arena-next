import { gql } from "@apollo/client";

export const channelSsrQueryNode = gql`
  query ChannelSsrQuery($id: ID!) {
    channel(id: $id) {
      id
      title
      description(format: HTML, no_links: false)
      visibility
      counts {
        followers
        contents
        blocks
        channels
      }
      owner {
        ... on User {
          id
          name
          slug
        }
        ... on Group {
          id
          name
        }
      }
    }
  }
`;
