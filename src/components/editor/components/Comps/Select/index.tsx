import { forwardRef } from "react";
import { Select as ZSelect } from "zui-pro";
import { ComponentRenderData } from "../../../types/Components";

export const Select = forwardRef<any, ComponentRenderData>((props, ref) => {
  const { style } = props;
  return (
    <div ref={ref} {...props} style={style}>
      <ZSelect style={{ height: "100%", width: "100%" }}>
        {props.children}
      </ZSelect>
    </div>
  );
});