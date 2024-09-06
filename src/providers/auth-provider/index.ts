import { AuthProvider } from "@refinedev/core";
import { getSession, signIn, signOut } from "next-auth/react";
import dayjs from "dayjs";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const response = await signIn("credentials", {
            callbackUrl: "/roles",
            redirect: true,
            username: email,
            password
        });
        return {
            success: true,
            successNotification: {
                message: 'welcome'
            }
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
        if (error.response?.status === 401) {
            return {
                logout: true,
            };
        }

        return {
            error,
        };
    },
    check: async () => {
        const session = await getSession()

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
        return null;
    },
    getIdentity: async () => {
        // if (data?.user) {
        //   const { user } = data;
        //   return {
        //     name: user.name,
        //     avatar: user.image,
        //   };
        // }

        return null;
    },
};