import { forwardRef } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Text = forwardRef<any, ComponentRenderData>((props, ref) => {
  return <span {...props} ref={ref} />;
});
