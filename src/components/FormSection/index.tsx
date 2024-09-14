import { Accordion } from "@mantine/core";
import React, { PropsWithChildren } from "react";

interface FormSectionProps {
  title: string;
  opened?: boolean;
}

const FormSection = ({
  title,
  children,
  opened = true,
}: PropsWithChildren<FormSectionProps>) => {
  return (
    <Accordion
      variant="separated"
      defaultValue={opened ? "1" : undefined}
      mb="md"
    >
      <Accordion.Item value="1">
        <Accordion.Control>{title}</Accordion.Control>
        <Accordion.Panel>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default FormSection;
