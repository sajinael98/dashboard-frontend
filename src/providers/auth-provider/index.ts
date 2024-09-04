import { AuthProvider } from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";
import { signIn, signOut } from "next-auth/react";

export const authProvider: AuthProvider = {
    login: async () => {
        signIn("credentials", {
          callbackUrl: "/",
          redirect: true,
        });
        return {
            success: true,
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
        if (status === "unauthenticated") {
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