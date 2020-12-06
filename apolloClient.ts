import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const frontendApolloClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://api.are.na/graphql",
    headers: {
      "x-app-token": process.env.NEXT_PUBLIC_ARENA_TOKEN,
    },
  }),
  cache: new InMemoryCache(),
});

export const backendApolloClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: "https://api.are.na/graphql",
    headers: {
      "x-app-token": process.env.NEXT_PUBLIC_ARENA_TOKEN,
    },
  }),
  cache: new InMemoryCache(),
});
