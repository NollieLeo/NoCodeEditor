import { forwardRef } from "react";
import { Button as ZButton } from "zui-pro";
import { ComponentRenderData } from "../../../types/Components";

export const Button = forwardRef<any, ComponentRenderData>((props, ref) => {
  return (
    <div ref={ref} {...props} style={props.style}>
      <ZButton block style={{ height: "100%" }}>
        {props.children}
      </ZButton>
    </div>
  );
});
