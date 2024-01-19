import { FC, memo, useMemo } from "react";
import { DragInfo, DragOrigin } from "@/components/editor/types";
import { BorderedRectangle } from "@/components/editor/components/Tools/components/BorderedRectangle";
import { useGetDragInfo } from "@/components/editor/hooks/useGetDragInfo";
import { useGetOverInfo } from "@/components/editor/hooks/useGetOverInfo";
import { useGetElement } from "@/components/editor/hooks/useGetElement";
import { useGetNodeInfo } from "@/components/editor/hooks/useGetNodeInfo";

interface OverHighlightProps {
  dragInfo: DragInfo;
}

export const OverHighlightComp: FC<OverHighlightProps> = () => {
  const dragInfo = useGetDragInfo();
  const overInfo = useGetOverInfo();
  const { getElement } = useGetElement();
  const { getNodeInfo } = useGetNodeInfo();

  const highlightDomId = useMemo(() => {
    if (!dragInfo) {
      return null;
    }
    if (
      dragInfo.from === DragOrigin.SORT ||
      dragInfo.from === DragOrigin.MOVE
    ) {
      const dragNodeSchema = getNodeInfo(dragInfo.id);
      return dragNodeSchema.parentId;
    } else if (dragInfo.from === DragOrigin.SIDE_ADD && overInfo) {
      return overInfo.id;
    }
  }, [dragInfo, getNodeInfo, overInfo]);

  if (!highlightDomId) {
    return <></>;
  }

  const highlightTarget = getElement(highlightDomId);

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    left: domLeft,
  } = highlightTarget.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: domHeight,
    top: domTop,
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
