import { ComponentRenderData } from "@/components/editor/types";
import { forwardRef } from "react";

export const Container = forwardRef<any, ComponentRenderData>((props, ref) => {
  return <div {...props} ref={ref} />;
});
