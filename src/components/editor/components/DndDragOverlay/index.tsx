/**
 * @description 拖拽元素的overlay
 */
import { CSSProperties, memo } from "react";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { DragOverlay } from "@dnd-kit/core";
import { SiderBarDragOverlayComp } from "./components/SiderBarDragOverlayComp";
import { PanDragOverlayComp } from "./components/PanDragOverlayComp";

const dragOverlayStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
};

const DndDragOverlayComp = () => {
  return (
    <DragOverlay
      dropAnimation={null}
      adjustScale={false}
      style={dragOverlayStyle}
      modifiers={[snapCenterToCursor]}
    >
      <SiderBarDragOverlayComp />
      <PanDragOverlayComp />
    </DragOverlay>
  );
};
export const DndDragOverlay = memo(DndDragOverlayComp);
