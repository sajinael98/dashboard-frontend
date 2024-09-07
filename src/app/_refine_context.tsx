"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { Global, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/data-provider";
import { RefineThemes } from "@refinedev/mantine";
import "@styles/global.css";
import { IconLock, IconShield, IconUsersGroup } from "@tabler/icons-react";

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
          <NotificationsProvider>

            <Global styles={{ body: { WebkitFontSmoothing: 'auto' } }} />
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              authProvider={authProvider}
              // notificationProvider={useNotificationProvider}
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
                },
                {
                  name: 'permissions',
                  list: '/permissions',
                  meta: {
                    parent: 'administration',
                    icon: <IconLock />
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
          </NotificationsProvider>
        </MantineProvider>
      </RefineKbarProvider>
    </>
  );
};
