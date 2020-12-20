import "../index.css";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import App, { AppInitialProps } from "next/app";
import type { AppProps, AppContext } from "next/app";
import { initializeApollo, useApolloClient } from "../apolloClient";
import Head from "next/head";
import { useRef } from "react";

type AppCustomProps = {
  backendApolloState?: NormalizedCacheObject;
  backendApolloClient?: ApolloClient<NormalizedCacheObject>;
};

function MyApp({
  Component,
  pageProps,
  backendApolloState,
  backendApolloClient,
}: AppProps & AppCustomProps): JSX.Element {
  const backendApolloStateRef = useRef<NormalizedCacheObject | undefined>(
    backendApolloState
  );

  const frontendApolloClient = useApolloClient(backendApolloStateRef.current);

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
    backendApolloState: apolloClient && apolloClient.cache.extract(),
  };
};

export default MyApp;
