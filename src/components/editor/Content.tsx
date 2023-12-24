import { FC, memo, PropsWithChildren, useDeferredValue, useMemo } from "react";
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
import { useEditorMeasuring } from "./hooks/useEditorMeasuring";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const sensors = useEditorDndSensors();
  const { editorStore } = useEditorContext();
  const { onDragStart, onDragEnd, onDragOver } = useEditorDnd();
  const measuringConfig = useEditorMeasuring();

  const defferedNodes = useDeferredValue(editorStore.nodes.slice());
  const renderCompTree = useRenderComponentsTree();

  const compTrees = useMemo(
    () => renderCompTree(defferedNodes),
    [defferedNodes, renderCompTree]
  );

  return (
    <DndContext
      sensors={sensors}
      measuring={measuringConfig}
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
