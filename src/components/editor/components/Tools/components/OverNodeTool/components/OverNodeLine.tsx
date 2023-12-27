import { observer } from "mobx-react-lite";
import useToolWrapperRect from "@/components/editor/components/Tools/hooks/useToolWrapperRect";
import { isNil } from "lodash-es";
import { useEditorOverTarget } from "@/components/editor/hooks/useEditorOverTarget";
import { CSSProperties } from "react";

export const OverNodeLine = observer(() => {
  const wrapperRect = useToolWrapperRect();

  const [, targetRect] = useEditorOverTarget();

  if (isNil(wrapperRect) || isNil(targetRect)) {
    return <></>;
  }

  const style: CSSProperties = {
    width: 100,
    height: 2,
    top: targetRect.top - 1,
    zIndex: 4,
    left: targetRect.left - wrapperRect.left - 50,
    position: "absolute",
    background: "red",
  };

  return <div style={style} />;
});
