import { ComponentRenderData } from "@/components/editor/types";
import { forwardRef } from "react";

export const Text = forwardRef<any, ComponentRenderData>((props, ref) => {
  return <span {...props} ref={ref} />;
});
