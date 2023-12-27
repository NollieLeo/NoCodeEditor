import { observer } from "mobx-react-lite";
import useToolWrapperRect from "@/components/editor/components/Tools/hooks/useToolWrapperRect";
import { isNil } from "lodash-es";
import { useEditorInsertTarget } from "@/components/editor/hooks/useEditorInsertTarget";
import { CSSProperties, memo } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";

const OverNodeLineComp = observer(() => {
  const wrapperRect = useToolWrapperRect();
  const {
    editorStore: { panState },
  } = useEditorContext();
  const getInsertInfo = useEditorInsertTarget();

  const insertInfo = getInsertInfo();

  if (isNil(wrapperRect) || isNil(insertInfo) || isNil(panState)) {
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
    transform: `scale(${panState.scale})`,
  };

  return <div style={style} />;
});

export const OverNodeLine = memo(OverNodeLineComp);
