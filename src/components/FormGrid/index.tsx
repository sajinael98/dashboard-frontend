import { SimpleGrid } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const FormGrid = ({ children }: PropsWithChildren) => {
  return (
    <SimpleGrid
      breakpoints={[
        {
          minWidth: "lg",
          cols: 3,
        },
        {
          minWidth: "md",
          cols: 2,
        },
        {
          minWidth: "xs",
          cols: 1,
        },
      ]}
    >
      {children}
    </SimpleGrid>
  );
};

export default FormGrid;
