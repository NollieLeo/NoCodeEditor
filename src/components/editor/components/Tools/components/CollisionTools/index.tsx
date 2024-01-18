import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { SchemaData } from "@/components/editor/types";
import { isNil } from "lodash-es";
import { observer } from "mobx-react-lite";
import { memo, useMemo } from "react";
import { DraggingGuildLines } from "./components/DraggingGuildLines";
import { ParentCollisionLines } from "./components/ParentCollisionLines";
import { SiblingsCollisionLines } from "./components/SiblingsCollisionLines";
import { useGetDragData } from "@/components/editor/hooks/useGetDragNode";
import { isAbsoluteOrFixed } from "@/components/editor/utils/layout";
import "./index.scss";

const CollisionToolsTmpl = observer(() => {
  const {
    editorStore: { nodesMap, focusedInfo },
  } = useEditorContext();

  const dragInfo = useGetDragData();
  const nodeHasParentSchema = useMemo(() => {
    const targetId = dragInfo?.id || focusedInfo?.id;
    if (isNil(targetId)) {
      return null;
    }
    const target = nodesMap[targetId];
    if (isNil(target?.parentId) || !isAbsoluteOrFixed(target.data.style)) {
      return null;
    }
    return target as { parentId: string } & SchemaData;
  }, [dragInfo?.id, focusedInfo?.id, nodesMap]);

  if (!nodeHasParentSchema) {
    return <></>;
  }

  const { parentId, id } = nodeHasParentSchema;

  const parentRect = document.getElementById(parentId)?.getBoundingClientRect();
  const curRect = document.getElementById(id)?.getBoundingClientRect();

  if (!parentRect || !curRect) {
    return <></>;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="collision-lines"
    >
      <DraggingGuildLines dragRect={curRect} parentRect={parentRect} />
      {!!dragInfo && (
        <ParentCollisionLines dragRect={curRect} parentRect={parentRect} />
      )}
      {!!dragInfo && (
        <SiblingsCollisionLines
          rect={curRect}
          parentRect={parentRect}
          id={id}
          parentId={parentId}
        />
      )}
    </svg>
  );
});

export const CollisionTools = memo(CollisionToolsTmpl);
