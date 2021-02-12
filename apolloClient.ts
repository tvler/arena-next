import {
  ApolloClient,
  createHttpLink,
  FieldPolicy,
  FieldReadFunction,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import possibleTypes from "./possible-types.json";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const paginationPolicy: FieldPolicy = {
  keyArgs: false,
  merge(existing, incoming, { args }) {
    /*
     * Ensure args and data is properly set up
     */

    if (!args) {
      throw new Error("args not given");
    }
    if (!Array.isArray(incoming)) {
      throw new Error("incoming isn't an array");
    }
    if (typeof args?.page !== "number") {
      throw new Error("page isn't a number");
    }
    if (args.page === 0) {
      throw new Error("page is 0");
    }
    if (typeof args?.per !== "number") {
      throw new Error("per isn't a number");
    }

    // New array to be returned
    const newData = [];

    // Length of the new array
    const newDataLength = Math.max(
      Array.isArray(existing) ? existing.length : 0,
      args.page * args.per
    );

    // Index that the incoming data starts at in the newData array
    const incomingStartingIndex = (args.page - 1) * args.per;

    for (let i = 0; i < newDataLength; i++) {
      const isInIncomingWindow =
        i >= incomingStartingIndex && i < args.page * args.per;

      if (isInIncomingWindow) {
        const incomingItem = incoming[i - incomingStartingIndex];

        // For some reason, are.na sometimes doesn't return the amount of items
        // from the per argument. Set to null instead of undefined so that
        // the undefined item doesn't get squashed.
        if (incomingItem === undefined) {
          newData[i] = null;
        } else {
          newData[i] = incomingItem;
        }
      } else if (Array.isArray(existing) && i < existing.length) {
        newData[i] = existing[i];
      } else {
        newData[i] = null;
      }
    }

    return newData;
  },
};

const mapQueryToCache = (typename: string): FieldReadFunction => {
  return (existing, { args, toReference, variables }) => {
    if (existing) {
      return existing;
    }

    if (args?.id === undefined) {
      return undefined;
    }

    return toReference({
      __typename: variables?.typename ?? typename,
      id: args.id,
    });
  };
};

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: createHttpLink({
      uri: "https://api.are.na/graphql",
      headers: {
        "x-app-token": process.env.NEXT_PUBLIC_ARENA_TOKEN,
      },
    }),
    cache: new InMemoryCache({
      possibleTypes: possibleTypes,
      typePolicies: {
        Query: {
          fields: {
            clientMetadata: () => null,
            user: mapQueryToCache("User"),
            channel: mapQueryToCache("Channel"),
            blokk: mapQueryToCache("Konnectable"),
          },
        },
        User: {
          fields: {
            followers: paginationPolicy,
            following: paginationPolicy,
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
