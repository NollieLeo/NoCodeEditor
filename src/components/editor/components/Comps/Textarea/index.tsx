import { forwardRef } from "react";
import { ComponentRenderData } from "../../../types/Components";
import { Input } from "zui-pro";

export const Textarea = forwardRef<any, ComponentRenderData>((props, ref) => {
  return (
    <div {...props} ref={ref}>
      <Input.TextArea
        style={{ height: "100%", width: "100%", pointerEvents: "none" }}
        placeholder="textarea..."
      />
    </div>
  );
});
