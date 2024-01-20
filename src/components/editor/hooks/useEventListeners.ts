import { useEventListener } from "ahooks";
import { MouseEventHandler, MutableRefObject, useMemo } from "react";
import { getDomId } from "../utils/Dom";
import { useEditorContext } from "./useEditorContext";

export const useEventListeners = (
  ref: MutableRefObject<HTMLElement | null>
) => {
  const { editorStore } = useEditorContext();
  const listenerConfig = useMemo(
    () => ({
      target: ref,
      capture: true,
      passive: true,
    }),
    [ref]
  );

  const onClickCapture: MouseEventHandler = (e) => {
    const id = getDomId(e.target as HTMLElement);
    if (!id) {
      return;
    }
    requestAnimationFrame(() => {
      editorStore.setFocusedInfo({
        id,
      });
    });
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
