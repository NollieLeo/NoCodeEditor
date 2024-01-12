/**
 * @description 拖拽元素的overlay
 */
import { CSSProperties, memo } from "react";
import { DragOverlay } from "@dnd-kit/core";
import { SiderBarDragOverlayComp } from "./components/SiderBarDragOverlayComp";
import { SortOverlayComp } from "./components/SortOverlayComp";
import { observer } from "mobx-react-lite";
import { useOverlayModifiers } from "./hooks/useOverlayModifiers";

const DndDragOverlayComp = observer(() => {
  const overlayModifiers = useOverlayModifiers();

  const dragOverlayDefaultStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: "fit-content",
  };

  return (
    <DragOverlay
      dropAnimation={null}
      adjustScale={false}
      style={dragOverlayDefaultStyle}
      modifiers={overlayModifiers}
      wrapperElement="div"
    >
      <SiderBarDragOverlayComp />
      <SortOverlayComp />
    </DragOverlay>
  );
});

export const DndDragOverlay = memo(DndDragOverlayComp);
