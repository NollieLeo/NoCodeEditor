import { forwardRef } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Textarea = forwardRef<any, ComponentRenderData>((props, ref) => {
  return <textarea {...props} ref={ref} />;
});
