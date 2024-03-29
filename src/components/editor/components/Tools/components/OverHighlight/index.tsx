import { FC, memo, useMemo } from "react";
import { DragInfo, DragOrigin } from "@/components/editor/types";
import { BorderedRectangle } from "@/components/editor/components/Tools/components/BorderedRectangle";
import { useDragInfo } from "@/components/editor/hooks/useDragInfo";
import { useDragOverInfo } from "@/components/editor/hooks/useDragOverInfo";
import { useDom } from "@/components/editor/hooks/useDom";
import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { observer } from "mobx-react-lite";

interface OverHighlightProps {
  dragInfo: DragInfo;
}

export const OverHighlightComp: FC<OverHighlightProps> = observer(() => {
  const dragInfo = useDragInfo();
  const overInfo = useDragOverInfo();
  const { getDom } = useDom();
  const { getComponentInfo } = useGetComponentInfo();

  const highlightDomId = useMemo(() => {
    if (!dragInfo) {
      return null;
    }
    if ([DragOrigin.SORT, DragOrigin.MOVE].includes(dragInfo.from)) {
      const dragNodeSchema = getComponentInfo(dragInfo.id);
      return dragNodeSchema.parentId;
    } else if (dragInfo.from === DragOrigin.SIDE_ADD && overInfo) {
      return overInfo.id;
    }
  }, [dragInfo, getComponentInfo, overInfo]);

  if (!highlightDomId) {
    return <></>;
  }

  const highlightTarget = getDom(highlightDomId);

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
});

export const OverHighlight = memo(OverHighlightComp);
