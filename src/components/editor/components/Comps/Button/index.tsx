import { forwardRef } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Button = forwardRef<any, ComponentRenderData>((props, ref) => {
  return <button {...props} ref={ref} />;
});
