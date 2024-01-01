import { FC, memo, useMemo } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import {
  ComponentTypes,
  DragInfo,
  DragOrigin,
  DropInfo,
} from "@/components/editor/types";
import { observer } from "mobx-react-lite";
import { BorderedRectangle } from "@/components/editor/components/Tools/components/BorderedRectangle";

interface OverHighlightProps {
  overInfo: DropInfo;
  draggingInfo: DragInfo;
}

export const OverHighlightComp: FC<OverHighlightProps> = observer((props) => {
  const { overInfo, draggingInfo } = props;
  const {
    editorStore: { nodesMap },
  } = useEditorContext();

  const { id: dragId } = draggingInfo;
  const { id: overId, accepts } = overInfo;
  const { type: overType } = nodesMap[overId];

  const isContainerBox = [
    ComponentTypes.CONTAINER,
    ComponentTypes.PAGE,
  ].includes(overType);

  const highlightDomId = useMemo(() => {
    if (draggingInfo.from === DragOrigin.PAN_SORT) {
      return isContainerBox && accepts?.includes(dragId)
        ? overId
        : draggingInfo.parentId;
    } else if (draggingInfo.from === DragOrigin.SIDE_ADD) {
      return isContainerBox ? overId : overInfo.parentId;
    }
  }, [
    accepts,
    dragId,
    draggingInfo,
    isContainerBox,
    overId,
    overInfo.parentId,
  ]);

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
