import { forwardRef } from "react";
import { ComponentRenderData } from "@/components/editor/types";
import { Input as ZInput } from "zui-pro";

export const Input = forwardRef<any, ComponentRenderData>((props, ref) => {
  return (
    <div {...props} ref={ref}>
      <ZInput style={{ height: "100%", width: "100%" }} />
    </div>
  );
});
