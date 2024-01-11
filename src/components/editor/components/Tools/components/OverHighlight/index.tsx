import { FC, memo, useMemo } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import {
  ComponentTypes,
  DragInfo,
  DragOrigin,
} from "@/components/editor/types";
import { observer } from "mobx-react-lite";
import { BorderedRectangle } from "@/components/editor/components/Tools/components/BorderedRectangle";

interface OverHighlightProps {
  draggingInfo: DragInfo;
}

export const OverHighlightComp: FC<OverHighlightProps> = observer((props) => {
  const { draggingInfo } = props;
  const {
    editorStore: { nodesMap, overInfo },
  } = useEditorContext();

  const highlightDomId = useMemo(() => {
    if (
      draggingInfo.from === DragOrigin.SORT ||
      draggingInfo.from === DragOrigin.MOVE
    ) {
      return draggingInfo.parentId;
    } else if (draggingInfo.from === DragOrigin.SIDE_ADD && overInfo) {
      const { id: overId } = overInfo;
      const { type: overType } = nodesMap[overId];
      const isContainerBox = [
        ComponentTypes.CONTAINER,
        ComponentTypes.PAGE,
      ].includes(overType);
      return isContainerBox ? overId : overInfo.parentId;
    }
  }, [draggingInfo, nodesMap, overInfo]);

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
});

export const OverHighlight = memo(OverHighlightComp);
