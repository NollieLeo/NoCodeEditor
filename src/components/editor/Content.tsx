import { FC, memo, PropsWithChildren, useMemo } from "react";
import { DndContext } from "@dnd-kit/core";
import { find } from "lodash-es";
import { observer } from "mobx-react-lite";
import { ZoomPan } from "./components/ZoomPan";
import { Siderbar } from "./components/Siderbar";
import { DndMonitor } from "./components/DndMonitor";
import useEditorDndSensors from "./hooks/useEditorDndSensors";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import useEditorDnd from "./hooks/useEditorDnd";
import { ComponentTypes } from "./types";
import { Tools } from "./components/Tools";
import { useEditorCollisionDetection } from "./hooks/useEditorCollisionDetection";
import { CompTree } from "./components/CompTree";
import useEditorDndModifiers from "./hooks/useEditorDndModifiers";
import { useEditorMeasuring } from "./hooks/useEditorMeasuring";

import "./Content.scss";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const sensors = useEditorDndSensors();
  const modifiers = useEditorDndModifiers();
  const measuring = useEditorMeasuring();
  const editorCollisionDetection = useEditorCollisionDetection();

  const {
    editorStore: { nodesMap },
  } = useEditorContext();

  const { onDragStart, onDragEnd, onDragOver, onDragMove } = useEditorDnd();

  const rootId = useMemo(() => {
    const root = find(nodesMap, ({ type }) => type === ComponentTypes.PAGE);
    if (!root) {
      return null;
    }
    return root.id;
  }, [nodesMap]);

  return (
    <div className="editor-wrapper">
      <DndContext
        sensors={sensors}
        measuring={measuring}
        modifiers={modifiers}
        collisionDetection={editorCollisionDetection}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
      >
        {/* -------------- Helper Tools -------------- */}
        {<Tools />}
        {/* --------- Siderbar for editor --------- */}
        <Siderbar />
        {/* --------- Editor's zoom pan --------- */}
        <ZoomPan>
          <CompTree rootId={rootId} />
        </ZoomPan>
        {/* --------- Dnd overlays for editor's global drag overlay  ---------- */}
        <DndDragOverlay />
        {/* --------- Dnd monitor for editor's global Dnd events  ---------- */}
        <DndMonitor />
      </DndContext>
    </div>
  );
});

export const Content = memo(ContentComp);
