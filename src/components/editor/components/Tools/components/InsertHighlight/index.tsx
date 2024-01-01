import { observer } from "mobx-react-lite";
import { isNil } from "lodash-es";
import { useEditorInsertTarget } from "@/components/editor/hooks/useEditorInsertTarget";
import { CSSProperties, memo } from "react";
import { useToolsContext } from "../../hooks/useToolsContext";

const InsertHighlightComp = observer(() => {
  const { panState } = useToolsContext();
  const getInsertInfo = useEditorInsertTarget();

  const insertInfo = getInsertInfo();

  if (isNil(insertInfo)) {
    return <></>;
  }

  const {
    insertRect: { top: insertTop, left: insertLeft },
    direction,
  } = insertInfo;

  const width = direction === "vertical" ? 100 : 2;
  const height = direction === "vertical" ? 2 : 60;
  const top = direction === "vertical" ? insertTop - 1 : insertTop - 30;
  const left = direction === "vertical" ? insertLeft - 50 : insertLeft - 1;

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

export const InsertHighlight = memo(InsertHighlightComp);
