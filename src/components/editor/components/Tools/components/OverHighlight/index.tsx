import { FC, memo, useMemo } from "react";
import { DragInfo, DragOrigin } from "@/components/editor/types";
import { BorderedRectangle } from "@/components/editor/components/Tools/components/BorderedRectangle";
import { useDndContext } from "@dnd-kit/core";

interface OverHighlightProps {
  draggingInfo: DragInfo;
}

export const OverHighlightComp: FC<OverHighlightProps> = () => {
  const { over, active } = useDndContext();

  const highlightDomId = useMemo(() => {
    if (!active) {
      return null;
    }
    const draggingInfo = active.data.current as DragInfo;
    if (
      draggingInfo.from === DragOrigin.SORT ||
      draggingInfo.from === DragOrigin.MOVE
    ) {
      return draggingInfo.parentId;
    } else if (draggingInfo.from === DragOrigin.SIDE_ADD && over) {
      return over.id;
    }
  }, [active, over]);

  if (!highlightDomId) {
    return <></>;
  }

  const highlightTarget = document.getElementById(String(highlightDomId));

  if (!highlightTarget) {
    return <></>;
  }

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    left: domLeft,
  } = highlightTarget.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    zIndex: 3,
    left: domLeft,
  };

  return (
    <BorderedRectangle
      style={style}
      borderAttrs={{
        stroke: "red",
        strokeDasharray: "4 4",
      }}
    />
  );
};

export const OverHighlight = memo(OverHighlightComp);
