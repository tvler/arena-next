import gql from "graphql-tag";

export const channelBlockFragment = gql`
  fragment ChannelBlockFragment on Channel {
    id
    title(truncate: 80)
    href
    updated_at(relative: true)
    slug
    visibility
    counts {
      contents
    }
    owner {
      ... on Group {
        id
        name
        visibility
      }
      ... on User {
        id
        name
      }
    }
  }
`;

export default channelBlockFragment;
