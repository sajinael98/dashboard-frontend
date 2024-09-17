"use client";

import Authenticated from "@components/Authenticated";
import { FormProvider } from "@hooks/use-form";
import { Button, Menu, Modal, PasswordInput, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useChangePassword, useUserForm } from "@modules/users/infrastructure";
import { UserForm } from "@modules/users/presentation";
import { useResourceParams } from "@refinedev/core";
import { Edit, SaveButton } from "@refinedev/mantine";
import { IconMenu2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const EditUserPage = () => {
  const [opened, { close, open }] = useDisclosure(false);
  const { onSubmit, getInputProps, reset } = useForm({
    initialValues: {
      password: "",
    },
    validate: zodResolver(
      z.object({
        password: z
          .string()
          .min(6, { message: "the password must be greater than 6 digits." }),
      })
    ),
  });
  const { saveButtonProps, refineCore, ...form } = useUserForm();
  const { mutateAsync } = useChangePassword();
  const { id } = useResourceParams();
  const router = useRouter();

  function navigateToRoleAssign() {
    router.push(`/users/${id}/roles`);
  }

  function closeChangePasswordModalHandler() {
    close();
    reset();
  }

  function changePasswordHandler(values: { password: string }) {
    mutateAsync({
      method: "patch",
      url: `/sys-auth/${id}/password`,
      values,
    }).then(() => closeChangePasswordModalHandler());
  }
  return (
    <>
      <Modal
        title="Change Password"
        opened={opened}
        onClose={closeChangePasswordModalHandler}
      >
        <form onSubmit={onSubmit(changePasswordHandler)}>
          <Stack align="flex-end">
            <PasswordInput
              w="100%"
              label="Password"
              {...getInputProps("password")}
            />
            <SaveButton type="submit" onClick={undefined} />
          </Stack>
        </form>
      </Modal>
      <Edit
        saveButtonProps={saveButtonProps}
        headerButtons={({
          defaultButtons,
          listButtonProps,
          refreshButtonProps,
        }) => {
          return (
            <>
              {defaultButtons}
              <Menu withinPortal withArrow>
                <Menu.Target>
                  <Button leftIcon={<IconMenu2 />}>Menu</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Authenticated roles={['Admin']}>
                    <Menu.Item onClick={navigateToRoleAssign}>
                      {" "}
                      Role Assignment
                    </Menu.Item>
                  </Authenticated>
                  <Authenticated roles={['System User']}>
                    <Menu.Item onClick={open}> Change Password</Menu.Item>
                  </Authenticated>
                </Menu.Dropdown>
              </Menu>
            </>
          );
        }}
      >
        <FormProvider form={form as any}>
          <UserForm />
        </FormProvider>
      </Edit>
    </>
  );
};

export default EditUserPage;
