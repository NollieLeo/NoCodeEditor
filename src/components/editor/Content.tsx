import { FC, memo, useDeferredValue, PropsWithChildren } from "react";
import { DndContext } from "@dnd-kit/core";
import { toJS } from "mobx";
import { ZoomPan } from "./components/ZoomPan";
import { Siderbar } from "./components/Siderbar";
import { DndMonitor } from "./components/DndMonitor";
import { observer } from "mobx-react-lite";
import useEditorDndSensors from "./hooks/useEditorDndSensors";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import useEditorDnd from "./hooks/useEditorDnd";

import "./Content.scss";
import { useRenderComponentsTree } from "./hooks/useRenderComponentsTree";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const sensors = useEditorDndSensors();
  const { editorStore } = useEditorContext();
  const { onDragStart, onDragEnd, onDragOver } = useEditorDnd();
  const defferedNodes = useDeferredValue(toJS(editorStore.nodes));
  const renderCompTree = useRenderComponentsTree();

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="editor-wrapper">
        {/* --------- Siderbar for editor --------- */}
        <Siderbar />
        {/* --------- Editor's zoom pan */}
        <ZoomPan>{renderCompTree(defferedNodes)}</ZoomPan>
        {/* --------- Dnd overlays for editor's global drag overlay  ---------- */}
        <DndDragOverlay />
      </div>
      {/* --------- Dnd monitor for editor's global Dnd events  ---------- */}
      <DndMonitor />
    </DndContext>
  );
});

export const Content = memo(ContentComp);
