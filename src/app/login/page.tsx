"use client";

import { useDocumentTitle } from "@mantine/hooks";
import { AuthPage } from "@refinedev/mantine";

const LoginPage = () => {
  useDocumentTitle("Login");
  return (
    <AuthPage
      formProps={{
        initialValues: {
          email: "saji.nael.98@gmail.com",
          password: "123456",
        },
      }}
    />
  );
};

export default LoginPage;
