import { FC, memo, PropsWithChildren, useMemo } from "react";
import { DndContext } from "@dnd-kit/core";
import { find } from "lodash-es";
import { observer } from "mobx-react-lite";
import { ZoomPan } from "./components/ZoomPan";
import { Siderbar } from "./components/Siderbar";
import { DndMonitor } from "./components/DndMonitor";
import useDndSensors from "./hooks/useDndSensors";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import { ComponentTypes } from "./types";
import { Tools } from "./components/Tools";
import { useCollisionDetection } from "./hooks/useCollisionDetection";
import { CompTree } from "./components/CompTree";
import useDndModifiers from "./hooks/useDndModifiers";
import { useDndMeasuring } from "./hooks/useDndMeasuring";

import "./Content.scss";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const sensors = useDndSensors();
  const modifiers = useDndModifiers();
  const measuring = useDndMeasuring();
  const editorCollisionDetection = useCollisionDetection();

  const {
    editorStore: { nodesMap },
  } = useEditorContext();

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
