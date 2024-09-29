import { Accordion, Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";

interface FormSectionProps {
  title: string;
  opened?: boolean;
  error?: string;
}

const FormSection = ({
  title,
  children,
  opened = true,
  error
}: PropsWithChildren<FormSectionProps>) => {
  return (
    <Accordion
      color="red"
      variant="separated"
      defaultValue={opened ? "1" : undefined}
      mb="md"
    >
      <Accordion.Item value="1">
        <Accordion.Control>
          {title}
          {error && <Text fz="xs" c="red">{error}</Text>}
        </Accordion.Control>
        <Accordion.Panel>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default FormSection;
