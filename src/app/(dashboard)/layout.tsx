import { ThemedLayoutV2 } from "@refinedev/mantine";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <ThemedLayoutV2>{children}</ThemedLayoutV2>;
};

export default layout;
