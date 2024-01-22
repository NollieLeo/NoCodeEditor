import { FC, memo, PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";
import { Viewport } from "./components/Viewpot";
import { Siderbar } from "./components/Siderbar";
import { DndMonitor } from "./components/DndMonitor";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import { Tools } from "./components/Tools";
import { useRegistryComponents } from "./hooks/useRegistryComponents";
import { Frames } from "./components/Frames";
import { DndContextWrapper } from "./components/DndContextWrapper";
import { useAsyncEffect, useUpdateEffect } from "ahooks";
import { toJS } from "mobx";
import "./Content.scss";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const { isGenerating, registryComponents } = useRegistryComponents();

  const { editorStore } = useEditorContext();

  useAsyncEffect(async () => {
    const res = await registryComponents(editorStore.meta);
    editorStore.setComponentsInfo(res);
  }, []);

  useUpdateEffect(() => {
    console.log("meta", toJS(editorStore.meta));
  }, [toJS(editorStore.meta)]);

  useUpdateEffect(() => {
    console.log("componentsInfo", toJS(editorStore.componentsInfo));
  }, [toJS(editorStore.componentsInfo)]);

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
