"use client";

import { FormProvider } from "@hooks/use-form";
import { Group, Paper, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import UserRoles from "@modules/users/presentation/UserRole";
import { useCustomMutation } from "@refinedev/core";
import { SaveButton } from "@refinedev/mantine";
import { Suspense } from "react";

const RoleAssignPage = ({
  params: { id: userId },
}: {
  params: Record<string, string>;
}) => {
  const form = useForm({
    transformValues(values) {
      return Object.entries(values)
        .filter(([_, value]) => value)
        .map(([key, _]) => key);
    },
  });
  const { mutate, isLoading } = useCustomMutation({
    mutationOptions: {
      onSettled(data, error, variables, context) {
        if (!error) {
          showNotification({
            message: "saved",
          });
        }
      },
    },
  });
  function saveHandler(values: any) {
    mutate({
      method: "post",
      url: `/users/${userId}/roles`,
      values,
    });
  }
  return (
    <Paper p="md">
      <form onSubmit={form.onSubmit(saveHandler)}>
        <FormProvider form={form as any}>
          <Group position="apart" align="flex-start" mb="md">
            <Text fw={500} fz="lg">
              Role Assignment
            </Text>
            <SaveButton
              type="submit"
              onClick={undefined}
              disabled={isLoading}
            />
          </Group>
          <Suspense fallback={<div>loading...</div>}>
            <UserRoles userId={parseInt(userId)} />
          </Suspense>
        </FormProvider>
      </form>
    </Paper>
  );
};

export default RoleAssignPage;
