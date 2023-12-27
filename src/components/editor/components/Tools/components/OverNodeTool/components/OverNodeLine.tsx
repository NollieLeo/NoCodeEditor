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

  const { insertRect } = insertInfo;

  const style: CSSProperties = {
    width: 100,
    height: 2,
    top: insertRect.top - 1,
    zIndex: 4,
    left: insertRect.left - wrapperRect.left - 50,
    position: "absolute",
    background: "red",
  };

  return <div style={style} />;
});
