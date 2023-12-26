import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import useToolWrapperRect from "@/components/editor/components/Tools/hooks/useToolWrapperRect";
import { isNil } from "lodash-es";
import { useEditorOverTarget } from "@/components/editor/hooks/useEditorOverTarget";

export const OverNodeLine = observer(() => {
  const {
    editorStore: { overInfo, draggingInfo, nodesMap },
  } = useEditorContext();

  const wrapperRect = useToolWrapperRect();

  const [,targetTop] = useEditorOverTarget();

  if (isNil(overInfo) || isNil(wrapperRect) || isNil(draggingInfo)) {
    return <></>;
  }

  const overDom = document.getElementById(String(overInfo.id));

  if (!overDom) {
    return <></>;
  }

  const {
    width: domWidth,
    bottom: domBottom,
    left: domLeft,
  } = overDom.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: 2,
    top: targetTop,
    bottom: domBottom,
    zIndex: 4,
    left: domLeft - wrapperRect.left,
    position: "absolute",
    background: "red",
  };

  return <div style={style} />;
});
