import { FC, memo, PropsWithChildren, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Viewport } from "./components/Viewpot";
import { Siderbar } from "./components/Siderbar";
import { DndMonitor } from "./components/DndMonitor";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import { Tools } from "./components/Tools";
import { useGenComponentsInfo } from "./hooks/ussGenComponentsInfo";
import { mocks } from "./stores/mocks";
import { Frames } from "./components/Frames";

import "./Content.scss";
import { DndContextWrapper } from "./components/DndContextWrapper";

const ContentComp: FC<PropsWithChildren> = observer(() => {
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
      <DndContextWrapper>
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
      </DndContextWrapper>
    </div>
  );
});

export const Content = memo(ContentComp);
