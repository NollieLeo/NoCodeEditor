import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useSelectComponent } from "@/components/editor/hooks/useSelectComponent";
import { getDomId } from "@/components/editor/utils/Dom";
import { useEventListener } from "ahooks";
import { MouseEventHandler, MutableRefObject, useMemo } from "react";

export const useEventListeners = (
  ref: MutableRefObject<HTMLElement | null>
) => {
  const { editorStore } = useEditorContext();
  const { onSelectComponent } = useSelectComponent();
  const listenerConfig = useMemo(
    () => ({
      target: ref,
      capture: true,
    }),
    [ref]
  );

  const onClickCapture: MouseEventHandler = (e) => {
    const id = getDomId(e.target as HTMLElement);
    onSelectComponent(id);
  };

  const onMouseOverCapture: MouseEventHandler = (e) => {
    const id = getDomId(e.target as HTMLElement);
    if (!id) {
      return;
    }
    requestAnimationFrame(() => {
      editorStore.setHoverNodeId(id);
    });
  };

  const onMouseLeaveCapture: MouseEventHandler = (e) => {
    const id = getDomId(e.target as HTMLElement);
    if (!id) {
      return;
    }
    requestAnimationFrame(() => {
      editorStore.setHoverNodeId(null);
    });
  };

  useEventListener("mouseover", onMouseOverCapture, listenerConfig);
  useEventListener("mouseleave", onMouseLeaveCapture, listenerConfig);
  useEventListener("click", onClickCapture, listenerConfig);
};
