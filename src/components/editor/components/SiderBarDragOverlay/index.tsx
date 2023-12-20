import { DragOverlay } from "@dnd-kit/core";
import { CSSProperties, FC, useMemo } from "react";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { ComponentTypes } from "../../types";
import { COMPONENTS_INFO } from "../../constants";

const dragOverlayStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
};

export const SiderBarDragOverlay: FC<{
  type?: ComponentTypes;
}> = (props) => {
  const { type } = props;

  const activeSiderBarComp = useMemo(() => {
    if (type) {
      const { render: Component, defaultData } = COMPONENTS_INFO[type];
      const { style, ...res } = defaultData;
      return <Component style={{ ...style, userSelect: "none" }} {...res} />;
    }
  }, [type]);

  return (
    <DragOverlay
      dropAnimation={null}
      adjustScale
      style={dragOverlayStyle}
      modifiers={[snapCenterToCursor]}
    >
      {activeSiderBarComp || <></>}
    </DragOverlay>
  );
};
