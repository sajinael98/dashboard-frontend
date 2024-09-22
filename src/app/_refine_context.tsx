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
import {
  IconCarrot,
  IconChefHat,
  IconLock,
  IconShield,
  IconToolsKitchen2,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { accessControlPorvider } from "@providers/access-control-provider";

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
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              authProvider={authProvider}
              accessControlProvider={accessControlPorvider}
              // notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "food menu",
                  meta: {
                    icon: <IconChefHat />,
                    label: "Food Menu"
                  }
                }
                ,
                {
                  name: "categories",
                  list: "/categories",
                  meta: {
                    icon: <IconToolsKitchen2 />,
                    parent: "food menu"
                  }
                },
                {
                  name: "demo",
                  list: "/demo"
                },
                {
                  name: "items",
                  list: "/items",
                  create: "/items/create",
                  edit: "/items/edit/:id",
                  meta: {
                    icon: <IconCarrot />,
                    parent: "food menu"
                  }
                },
                {
                  name: "administration",
                  meta: {
                    label: "Administration",
                    icon: <IconShield />,
                  },
                },
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  meta: {
                    parent: "administration",
                    icon: <IconUser />,
                  },
                },
                {
                  name: "roles",
                  list: "/roles",
                  meta: {
                    parent: "administration",
                    icon: <IconUsersGroup />,
                  },
                },
                {
                  name: "permissions",
                  list: "/permissions",
                  meta: {
                    parent: "administration",
                    icon: <IconLock />,
                  },
                },
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
