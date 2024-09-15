import { usePermissions } from "@refinedev/core";
import { PropsWithChildren, useEffect, useState } from "react";

interface AuthenticatedProps {
  permissions?: string[];
  roles?: string[];
}

const Authenticated = ({
  roles,
  permissions,
  children,
}: PropsWithChildren<AuthenticatedProps>) => {
  const [visible, setVisible] = useState(false);
  const { data, isSuccess, isLoading } = usePermissions();
  useEffect(() => {
    if (data && isSuccess) {
      console.log(data);
      const { roles: rolesList, permissions: permissionsList } = data as {
        permissions: string[];
        roles: string[];
      };
      if (roles && permissions) {
        const hasRoles =
          rolesList.filter((role) => roles.includes(role)).length ===
          roles.length;
        const hasPermissions =
          permissionsList.filter((role) => permissions.includes(role))
            .length === permissions.length;
        if (hasRoles && hasPermissions) {
          setVisible(true);
        }
      } else if (roles) {
        const hasRoles =
          rolesList.filter((role) => roles.includes(role)).length ===
          roles.length;
        if (hasRoles) {
          setVisible(true);
        }
      } else if (permissions) {
        const hasPermissions =
          permissionsList.filter((role) => permissions.includes(role))
            .length === permissions.length;
        if (hasPermissions) {
          setVisible(true);
        }
      }
    }
  }, [data, isSuccess]);

  if (isLoading || visible) {
    return null;
  }
  return children;
};

export default Authenticated;
