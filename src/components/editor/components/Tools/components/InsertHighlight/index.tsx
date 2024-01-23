import { observer } from "mobx-react-lite";
import { isNil } from "lodash-es";
import { useInsertTarget } from "@/components/editor/hooks/useInsertTarget";
import { memo } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import classNames from "classnames";
import "./index.scss";

const LINE_VERTICAL_SIZE = {
  width: 110,
  height: 3,
} as const;

const LINE_HORIZONTAL_SIZE = {
  width: 3,
  height: 110,
} as const;

const InsertHighlightComp = observer(() => {
  const {
    editorStore: { zoom },
  } = useEditorContext();

  const getInsertInfo = useInsertTarget();

  const insertInfo = getInsertInfo();

  if (isNil(insertInfo)) {
    return <></>;
  }

  const { insertRect, direction } = insertInfo;

  const size =
    direction === "vertical" ? LINE_VERTICAL_SIZE : LINE_HORIZONTAL_SIZE;
  const top = insertRect.top - size.height / 2;
  const left = insertRect.left - size.width / 2;

  const style = {
    ...size,
    top,
    left,
    transform: `scale(${zoom})`,
  };

  return (
    <div
      className={classNames("editor-insert-highlight", direction)}
      style={style}
    />
  );
});

export const InsertHighlight = memo(InsertHighlightComp);
