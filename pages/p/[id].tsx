import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const test = gql`
  query ProfileChannels($id: ID!) {
    identity(id: $id) {
      identifiable {
        ... on User {
          id
          name
          counts {
            channels
            followers
            following
          }
          channels(page: 1, per: 1, sort_by: UPDATED_AT) {
            id
            href
            truncatedTitle: title(truncate: 80)
            visibility
            updated_at(relative: true)
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
        }
      }
    }
  }
`;

const Page: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const q = useQuery(test, {
    ssr: true,
    variables: {
      id,
    },
  });

  return <div>{JSON.stringify(q.data)}</div>;
};

export default Page;
