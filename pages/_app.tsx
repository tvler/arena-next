import "tailwindcss/tailwind.css";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  getDataFromTree,
  renderToStringWithData,
} from "@apollo/client/react/ssr";
import App, { AppInitialProps } from "next/app";
import type { AppProps, AppContext } from "next/app";
import { backendApolloClient, frontendApolloClient } from "../apolloClient";
import { useRef } from "react";
import { initializeApollo, useApollo } from "../apolloClient2";
import Head from "next/head";

type AppCustomProps = {
  initialApolloState: NormalizedCacheObject;
};

function MyApp({
  Component,
  pageProps,
  initialApolloState,
}: AppProps & AppCustomProps) {
  const apolloClient = useApollo(initialApolloState);

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
  const apolloClient = initializeApollo();

  console.log("here");

  if (typeof window === "undefined") {
    await getDataFromTree(
      <ApolloProvider client={apolloClient}>
        <appContext.AppTree {...appProps} Component={appContext.Component} />
      </ApolloProvider>
    );

    // console.log(appContext.AppTree.toString());
    // await getDataFromTree(
    //   // <appContext.AppTree {...appProps}>
    //   <ApolloProvider client={apolloClient}>
    //     <appContext.Component {...appProps.pageProps} />
    //   </ApolloProvider>,
    //   // </appContext.AppTree>
    //   {
    //     router: appContext.router,
    //   }
    // );

    // await getDataFromTree(
    //   <ApolloProvider client={apolloClient}>
    //     <appContext.AppTree {...appProps}>
    //       {/* <appContext.Component {...appProps.pageProps} /> */}
    //     </appContext.AppTree>
    //   </ApolloProvider>
    // );

    Head.rewind();
  }

  console.log(Object.keys(apolloClient.cache.extract()));

  return {
    ...appProps,
    initialApolloState: apolloClient.cache.extract(),
  };
};

export default MyApp;
