import { showNotification } from "@mantine/notifications";
import { useCustomMutation } from "@refinedev/core";

export function useChangePassword() {
  return useCustomMutation({
    mutationOptions: {
      onSettled(_data, error, _variables, _context) {
        if (!error) {
          showNotification({
            message: "Password has been changed.",
          });
        }
      },
    },
  });
}
