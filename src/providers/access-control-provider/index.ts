"use client";
import { authProvider } from "@providers/auth-provider";
import { AccessControlProvider } from "@refinedev/core";
const AUTHORIZED_PARENTS = ["administration"];

export const accessControlPorvider: AccessControlProvider = {
  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: true,
    },
  },
  can: async ({ resource, action }) => {
    if (resource && AUTHORIZED_PARENTS.includes(resource)) {
      return {
        can: true,
      };
    }
    if (authProvider && typeof authProvider.getPermissions === "function") {
      const user =
        authProvider.getIdentity && (await authProvider.getIdentity());
      if (user && (user as any).id === 1) {
        return {
          can: true,
        };
      }
      const userPermissions = (await authProvider.getPermissions()) as {
        roles: string[];
        permissions: string[];
      };
      const permissions = userPermissions.permissions as string[];
   
      let tempAction;
      switch (action) {
        case "list": {
          tempAction = "read";
          break;
        }
        case "edit": {
          tempAction = "update";
          break;
        }
        default:
          tempAction = action;
      }
      const permission = `${tempAction.toUpperCase()}_${resource?.toUpperCase()}`;
      return {
        can: permissions.includes(permission),
      };
    }
    return {
      can: false,
    };
  },
};
