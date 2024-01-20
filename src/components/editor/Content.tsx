import { FC, memo, PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";
import { Viewport } from "./components/Viewpot";
import { Siderbar } from "./components/Siderbar";
import { DndMonitor } from "./components/DndMonitor";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import { Tools } from "./components/Tools";
import { useGenComponentsInfo } from "./hooks/ussGenComponentsInfo";
import { Frames } from "./components/Frames";

import "./Content.scss";
import { DndContextWrapper } from "./components/DndContextWrapper";
import { useAsyncEffect } from "ahooks";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const { isGenerating, genComponentsInfo } = useGenComponentsInfo();

  const { editorStore, metas } = useEditorContext();

  useAsyncEffect(async () => {
    const res = await genComponentsInfo(metas);
    editorStore.setComponentsInfo(res);
  }, [metas]);

  return (
    <div className="editor-wrapper">
      <DndContextWrapper>
        {/* --------- Siderbar for editor --------- */}
        <Siderbar />
        {/* --------- Editor's Viewport --------- */}
        <Viewport>{!isGenerating && <Frames />}</Viewport>
        {/* --------- Dnd overlays for editor's global drag overlay  ---------- */}
        <DndDragOverlay />
        {/* -------------- Helper Tools -------------- */}
        {<Tools />}
        {/* --------- Dnd monitor for editor's global Dnd events  ---------- */}
        <DndMonitor />
      </DndContextWrapper>
    </div>
  );
});

export const Content = memo(ContentComp);
