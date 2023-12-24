import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { isNil } from "lodash-es";
import { memo } from "react";
import useToolWrapperRect from "../../hooks/useToolWrapperRect";
import { BorderedRectangle } from "../BorderedRectangle";
import { observer } from "mobx-react-lite";
import { DragOrigin } from "@/components/editor/types";

const OverNodeToolComp = observer(() => {
  const { editorStore } = useEditorContext();

  const { overNodeId, panState, draggingInfo } = editorStore;

  const wrapperRect = useToolWrapperRect();

  const overDom = document.getElementById(String(overNodeId));

  const isDragFromSide = draggingInfo?.from === DragOrigin.SIDE_ADD;

  if (!isDragFromSide || !overDom || !wrapperRect || isNil(panState)) {
    return <></>;
  }

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    left: domLeft,
  } = overDom.getBoundingClientRect();

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

export const OverNodeTool = memo(OverNodeToolComp);
