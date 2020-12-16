import { useMemo } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: createHttpLink({
      uri: "https://api.are.na/graphql",
      headers: {
        "x-app-token": process.env.NEXT_PUBLIC_ARENA_TOKEN,
      },
    }),
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            followers: {
              keyArgs: ["id"],
              merge(existing, incoming, { args }) {
                if (!args) {
                  throw new Error("args not given");
                }

                // Fix a mistake where page is 0 instead of 1
                let page = args.page;
                if (page === 0) {
                  page = 1;
                }

                if (typeof page !== "number") {
                  throw new Error("page isn't a number");
                }

                const per = args.per;

                if (typeof per !== "number") {
                  throw new Error("per isn't a number");
                }

                const offset = (page - 1) * per;
                const merged = existing ? existing.slice(0) : [];
                for (let i = 0; i < incoming.length; ++i) {
                  merged[offset + i] = incoming[i];
                }

                return merged;
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(
  initialState?: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
