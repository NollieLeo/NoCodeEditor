import { memo } from "react";
import { BorderedRectangle } from "../BorderedRectangle";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { isNil } from "lodash-es";
import useToolWrapperRect from "../../hooks/useToolWrapperRect";

const ActiveNodeToolComp = observer(() => {
  const { editorStore } = useEditorContext();
  const activeNodeDom = document.getElementById(
    String(editorStore.focusedNodeId)
  );

  const wrapperRect = useToolWrapperRect();

  if (!activeNodeDom || !wrapperRect || isNil(editorStore.panState)) {
    return <></>;
  }

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    left: domLeft,
  } = activeNodeDom.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    zIndex: 2,
    left: domLeft - wrapperRect.left,
  };

  return <BorderedRectangle style={style} anchorPoint />;
});

export const ActiveNodeTool = memo(ActiveNodeToolComp);
