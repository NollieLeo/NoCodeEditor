import { FC, memo, PropsWithChildren, useMemo } from "react";
import { DndContext } from "@dnd-kit/core";
import { ZoomPan } from "./components/ZoomPan";
import { Siderbar } from "./components/Siderbar";
import { DndMonitor } from "./components/DndMonitor";
import { observer } from "mobx-react-lite";
import useEditorDndSensors from "./hooks/useEditorDndSensors";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import useEditorDnd from "./hooks/useEditorDnd";
import { useRenderComponentsTree } from "./hooks/useRenderComponentsTree";

import "./Content.scss";
import { find } from "lodash-es";
import { ComponentTypes } from "./types";
import { useEditorCollisionDetection } from "./hooks/useEditorCollisionDetection";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const sensors = useEditorDndSensors();
  const {
    editorStore: { nodesMap },
  } = useEditorContext();
  const { onDragStart, onDragEnd, onDragOver } = useEditorDnd();
  const editorCollisionDetection = useEditorCollisionDetection();
  const renderCompTree = useRenderComponentsTree();

  const compTrees = useMemo(() => {
    const root = find(nodesMap, ({ type }) => type === ComponentTypes.PAGE);
    if (!root) {
      return <></>;
    }
    return renderCompTree(root.id);
  }, [nodesMap, renderCompTree]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={editorCollisionDetection}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="editor-wrapper">
        {/* --------- Siderbar for editor --------- */}
        <Siderbar />
        {/* --------- Editor's zoom pan */}
        <ZoomPan>{compTrees}</ZoomPan>
        {/* --------- Dnd overlays for editor's global drag overlay  ---------- */}
        <DndDragOverlay />
      </div>
      {/* --------- Dnd monitor for editor's global Dnd events  ---------- */}
      <DndMonitor />
    </DndContext>
  );
});

export const Content = memo(ContentComp);
