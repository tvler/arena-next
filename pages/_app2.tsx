import "tailwindcss/tailwind.css";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import App, { AppInitialProps } from "next/app";
import type { AppProps, AppContext } from "next/app";
import { backendApolloClient, frontendApolloClient } from "../apolloClient";
import { useRef } from "react";

type AppCustomProps = {
  backendApolloClientSerialization: string;
};

function MyApp({
  Component,
  pageProps,
  backendApolloClientSerialization,
}: AppProps & AppCustomProps): JSX.Element {
  const apolloClientRef = useRef<ApolloClient<NormalizedCacheObject>>();

  if (!apolloClientRef.current) {
    const backendNormalizedCacheObject: NormalizedCacheObject = JSON.parse(
      backendApolloClientSerialization
    );
    frontendApolloClient.restore(backendNormalizedCacheObject);
    apolloClientRef.current = frontendApolloClient;
  }

  return (
    <ApolloProvider client={apolloClientRef.current}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & AppCustomProps> => {
  const appProps = await App.getInitialProps(appContext);

  if (typeof window === "undefined") {
    await renderToStringWithData(
      <ApolloProvider client={backendApolloClient}>
        <appContext.Component {...appProps.pageProps} />
      </ApolloProvider>
    );
  }

  const backendApolloClientSerialization = JSON.stringify(
    backendApolloClient.extract()
  );

  return {
    ...appProps,
    backendApolloClientSerialization,
  };
};

export default MyApp;
