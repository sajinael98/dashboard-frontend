"use client";

import { FormProvider } from "@hooks/use-form";
import { useUserForm } from "@modules/users/infrastructure";
import { UserForm } from "@modules/users/presentation";
import { Create } from "@refinedev/mantine";

const CreateUserPage = () => {
  const { saveButtonProps, refineCore, ...form } = useUserForm()
  return (
    <Create saveButtonProps={saveButtonProps}>
      <FormProvider form={form as any}>
        <UserForm />
      </FormProvider>
    </Create>
  );
};

export default CreateUserPage;
