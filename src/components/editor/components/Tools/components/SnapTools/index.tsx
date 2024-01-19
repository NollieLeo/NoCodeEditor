import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin, SchemaData } from "@/components/editor/types";
import { isNil } from "lodash-es";
import { observer } from "mobx-react-lite";
import { memo, useMemo } from "react";
import { DraggingGuildLines } from "./components/DraggingGuildLines";
import { ParentSnapLines } from "./components/ParentSnapLines";
import { SiblingsSnapLines } from "./components/SiblingsSnapLines";
import { useGetDragInfo } from "@/components/editor/hooks/useGetDragInfo";
import { isAbsoluteOrFixed } from "@/components/editor/utils/layout";
import { useGetNodeInfo } from "@/components/editor/hooks/useGetNodeInfo";

import "./index.scss";
import { useGetElement } from "@/components/editor/hooks/useGetElement";

const SnapToolsCompTmpl = observer(() => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const dragInfo = useGetDragInfo();
  const { getNodeInfo } = useGetNodeInfo();
  const { getElement } = useGetElement();

  const nodeHasParentSchema = useMemo(() => {
    const targetId = dragInfo?.id || focusedInfo?.id;
    if (isNil(targetId) || dragInfo?.from !== DragOrigin.MOVE) {
      return null;
    }
    const target = getNodeInfo(targetId);
    if (isNil(target?.parentId) || !isAbsoluteOrFixed(target.data.style)) {
      return null;
    }
    return target as { parentId: string } & SchemaData;
  }, [dragInfo?.from, dragInfo?.id, focusedInfo?.id, getNodeInfo]);

  if (!nodeHasParentSchema || isNil(dragInfo)) {
    return <></>;
  }

  const { parentId, id } = nodeHasParentSchema;

  const parentRect = getElement(parentId).getBoundingClientRect();
  const curRect = getElement(id).getBoundingClientRect();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="collision-lines"
    >
      <DraggingGuildLines dragRect={curRect} parentRect={parentRect} />
      {!!dragInfo && (
        <ParentSnapLines dragRect={curRect} parentRect={parentRect} />
      )}
      {!!dragInfo && (
        <SiblingsSnapLines
          rect={curRect}
          parentRect={parentRect}
          id={id}
          parentId={parentId}
        />
      )}
    </svg>
  );
});

export const SnapTools = memo(SnapToolsCompTmpl);
