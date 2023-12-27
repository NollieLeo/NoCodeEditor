import { observer } from "mobx-react-lite";
import useToolWrapperRect from "@/components/editor/components/Tools/hooks/useToolWrapperRect";
import { isNil } from "lodash-es";
import { useEditorInsertTarget } from "@/components/editor/hooks/useEditorInsertTarget";
import { CSSProperties } from "react";

export const OverNodeLine = observer(() => {
  const wrapperRect = useToolWrapperRect();

  const getInsertInfo = useEditorInsertTarget();

  const insertInfo = getInsertInfo();

  if (isNil(wrapperRect) || isNil(insertInfo)) {
    return <></>;
  }

  const { insertRect, direction } = insertInfo;

  const { top: insertTop, left: insertLeft } = insertRect;

  const width = direction === "vertical" ? 100 : 2;
  const height = direction === "vertical" ? 2 : 60;
  const top = direction === "vertical" ? insertTop - 1 : insertTop - 30;
  const left =
    direction === "vertical"
      ? insertLeft - wrapperRect.left - 50
      : insertLeft - wrapperRect.left - 1;

  const style: CSSProperties = {
    width,
    height,
    top,
    zIndex: 4,
    left,
    position: "absolute",
    background: "red",
  };

  return <div style={style} />;
});
