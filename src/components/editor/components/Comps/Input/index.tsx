import { forwardRef } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Input = forwardRef<any, ComponentRenderData>((props, ref) => {
  return <input {...props} ref={ref} />;
});
