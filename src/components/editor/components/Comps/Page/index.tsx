import { forwardRef } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Page = forwardRef<any, ComponentRenderData>((props, ref) => {
  return <div {...props} ref={ref} />;
});
