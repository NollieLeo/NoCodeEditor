import { ComponentRenderData } from "@/components/editor/types";
import { forwardRef } from "react";
import { Input } from "antd";

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
