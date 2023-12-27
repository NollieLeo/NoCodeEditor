import { FC, memo, PropsWithChildren, useMemo } from "react";
import { DndContext } from "@dnd-kit/core";
import { find } from "lodash-es";
import { observer } from "mobx-react-lite";
import { ZoomPan } from "./components/ZoomPan";
import { Siderbar } from "./components/Siderbar";
// import { DndMonitor } from "./components/DndMonitor";
import useEditorDndSensors from "./hooks/useEditorDndSensors";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import useEditorDnd from "./hooks/useEditorDnd";
import { useRenderComponentsTree } from "./hooks/useRenderComponentsTree";

import "./Content.scss";
import { ComponentTypes } from "./types";
import { useEditorCollisionDetection } from "./hooks/useEditorCollisionDetection";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const sensors = useEditorDndSensors();
  const {
    editorStore: { nodesMap },
  } = useEditorContext();
  const { onDragStart, onDragEnd, onDragOver, onDragMove } = useEditorDnd();
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
    <div className="editor-wrapper">
      <DndContext
        sensors={sensors}
        collisionDetection={editorCollisionDetection}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
      >
        {/* --------- Siderbar for editor --------- */}
        <Siderbar />
        {/* --------- Editor's zoom pan --------- */}
        <ZoomPan>{compTrees}</ZoomPan>
        {/* --------- Dnd overlays for editor's global drag overlay  ---------- */}
        <DndDragOverlay />
        {/* --------- Dnd monitor for editor's global Dnd events  ---------- */}
        {/* <DndMonitor /> */}
      </DndContext>
    </div>
  );
});

export const Content = memo(ContentComp);
