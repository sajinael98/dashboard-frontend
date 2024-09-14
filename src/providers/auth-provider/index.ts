import { AuthProvider } from "@refinedev/core";
import { getSession, signIn, signOut } from "next-auth/react";
import dayjs from "dayjs";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    await signIn("credentials", {
      callbackUrl: "/home",
      redirect: true,
      username: email,
      password,
    });
    return {
      success: true,
      successNotification: {
        message: "welcome",
      },
    };
  },
  logout: async () => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });

    return {
      success: true,
    };
  },
  onError: async (error) => {
    if (error.status === 403 || error.response?.status === 403) {
      return {
        logout: true,
      };
    }

    return {
      error,
    };
  },
  check: async () => {
    const session = await getSession();

    const expirationDate = dayjs(session?.expires);
    const now = dayjs();
    const hasExpired = expirationDate.isBefore(now);

    if (hasExpired) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const session = await getSession();
    return {
      roles: session?.user.roles,
      permissions: session?.user.permissions,
    };
  },
  getIdentity: async () => {
    const session = await getSession();
    return session?.user;
  },
};
