"use client";

import { GitHubBanner, Refine, type AuthProvider } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { dataProvider } from "@providers/data-provider";
import "@styles/global.css";
import { Global, MantineProvider } from "@mantine/core";
import { RefineThemes, useNotificationProvider } from "@refinedev/mantine";
import { authProvider } from "@providers/auth-provider";

type RefineContextProps = {};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {};

const App = (props: React.PropsWithChildren<AppProps>) => {
  // const { data, status } = useSession();
  // const to = usePathname();

  // if (status === "loading") {
  //   return <span>loading...</span>;
  // }

  return (
    <>
      <RefineKbarProvider>
        <MantineProvider
          theme={RefineThemes.Green}
          withNormalizeCSS
          withGlobalStyles
        >
          <Global styles={{ body: { WebkitFontSmoothing: 'auto' } }} />
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
            }}
          >
            {props.children}
            <RefineKbar />
          </Refine>
        </MantineProvider>
      </RefineKbarProvider>
    </>
  );
};
