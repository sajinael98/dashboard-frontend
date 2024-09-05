"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { Global, MantineProvider } from "@mantine/core";
import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/data-provider";
import { RefineThemes, useNotificationProvider } from "@refinedev/mantine";
import "@styles/global.css";
import { IconShield, IconUsersGroup } from "@tabler/icons-react";

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
            resources={[
              {
                name: 'administration',
                meta: {
                  label: 'Administration',
                  icon: <IconShield />
                }
              },
              {
                name: 'roles',
                list: '/roles',
                meta: {
                  parent: 'administration',
                  icon: <IconUsersGroup />
                }
              }
            ]}
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
