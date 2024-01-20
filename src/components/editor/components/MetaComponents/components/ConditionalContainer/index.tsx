import { ComponentRenderData } from "@/components/editor/types";
import { forwardRef } from "react";

export const ConditionalContainer = forwardRef<any, ComponentRenderData>(
  (props, ref) => {
    return <div {...props} ref={ref} />;
  }
);
