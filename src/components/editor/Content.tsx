import { FC, memo, PropsWithChildren, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { observer } from "mobx-react-lite";
import { Viewport } from "./components/Viewpot";
import { Siderbar } from "./components/Siderbar";
import { DndMonitor } from "./components/DndMonitor";
import useDndSensors from "./hooks/useDndSensors";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import { Tools } from "./components/Tools";
import { useCollisionDetection } from "./hooks/useCollisionDetection";
import useDndModifiers from "./hooks/useDndModifiers";
import { useDndMeasuring } from "./hooks/useDndMeasuring";
import { useGenComponentsInfo } from "./hooks/ussGenComponentsInfo";
import { mocks } from "./stores/mocks";
import { Frames } from "./components/Frames";

import "./Content.scss";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const sensors = useDndSensors();
  const modifiers = useDndModifiers();
  const measuring = useDndMeasuring();
  const editorCollisionDetection = useCollisionDetection();

  const { isGenerating, genComponentsInfo } = useGenComponentsInfo();

  const { editorStore } = useEditorContext();

  async function genComponents() {
    const res = await genComponentsInfo(mocks);
    console.log(res);
    editorStore.setComponentsInfo(res);
  }

  useEffect(() => {
    genComponents();
  }, []);

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
        <Viewport>{!isGenerating && <Frames />}</Viewport>
        {/* --------- Dnd overlays for editor's global drag overlay  ---------- */}
        <DndDragOverlay />
        {/* --------- Dnd monitor for editor's global Dnd events  ---------- */}
        <DndMonitor />
      </DndContext>
    </div>
  );
});

export const Content = memo(ContentComp);
