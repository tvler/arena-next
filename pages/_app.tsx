import "../index.css";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import App, { AppInitialProps } from "next/app";
import type { AppProps, AppContext } from "next/app";
import { initializeApollo, useApollo } from "../apolloClient";
import Head from "next/head";

type AppCustomProps = {
  initialApolloState?: NormalizedCacheObject;
  backendApolloClient?: ApolloClient<NormalizedCacheObject>;
};

function MyApp({
  Component,
  pageProps,
  initialApolloState,
  backendApolloClient,
}: AppProps & AppCustomProps): JSX.Element {
  const frontendApolloClient = useApollo(initialApolloState);

  const apolloClient = backendApolloClient || frontendApolloClient;

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & AppCustomProps> => {
  const appProps = await App.getInitialProps(appContext);
  let apolloClient;

  if (typeof window === "undefined") {
    apolloClient = initializeApollo();
    await getDataFromTree(
      <appContext.AppTree {...appProps} backendApolloClient={apolloClient} />
    );

    Head.rewind();
  }

  return {
    ...appProps,
    initialApolloState: apolloClient && apolloClient.cache.extract(),
  };
};

export default MyApp;
