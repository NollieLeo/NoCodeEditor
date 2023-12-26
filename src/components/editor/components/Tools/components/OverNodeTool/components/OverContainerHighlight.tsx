import { isNil } from "lodash-es";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { ComponentTypes, DragOrigin } from "@/components/editor/types";
import { observer } from "mobx-react-lite";
import useToolWrapperRect from "@/components/editor/components/Tools/hooks/useToolWrapperRect";
import { BorderedRectangle } from "@/components/editor/components/Tools/components/BorderedRectangle";

export const OverContainerHighlight = observer(() => {
  const {
    editorStore: { overInfo, nodesMap, draggingInfo },
  } = useEditorContext();
  const wrapperRect = useToolWrapperRect();

  if (isNil(overInfo) || isNil(wrapperRect) || isNil(draggingInfo)) {
    return <></>;
  }

  const { id: dragId } = draggingInfo;
  const { id: overId, accepts } = overInfo;
  const { type: overType } = nodesMap[overId];

  let highlightDomId: string | undefined | null;

  const isContainerBox = [
    ComponentTypes.CONTAINER,
    ComponentTypes.PAGE,
  ].includes(overType);

  if (draggingInfo.from === DragOrigin.PAN_SORT) {
    highlightDomId =
      isContainerBox && accepts?.includes(dragId)
        ? overId
        : draggingInfo.parentId;
  } else if (draggingInfo.from === DragOrigin.SIDE_ADD) {
    highlightDomId = isContainerBox ? overId : overInfo.parentId;
  }

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
    left: domLeft - wrapperRect.left,
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
