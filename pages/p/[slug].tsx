import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const test = gql`
  query ProfileChannels {
    identity(id: "tyler-deitz") {
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

const test2 = gql`
  query ProfileChannels {
    identity(id: "karly-w") {
      identifiable {
        ... on User {
          id
          name
          counts {
            channels
            followers
            following
          }
          channels(page: 1, per: 10, sort_by: UPDATED_AT) {
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

const Page: NextPage = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  const q = useQuery(test, {
    ssr: true,
    // variables: {
    //   id: slug,
    // },
  });

  const r = useQuery(test2, { ssr: false });

  // console.log(q.data);
  // console.log(Object.keys(q.client.extract()));
  // console.log(q.loading);

  return (
    <div>
      {JSON.stringify(q.data)}
      {r.loading ? "LOADING" : "LOADED"}
    </div>
  );
};

export default Page;
