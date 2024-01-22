import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { Timeout } from "ahooks/lib/useRequest/src/types";
import { useRef } from "react";
import InfiniteViewer, { OnPinch } from "react-infinite-viewer";

export function useViewerTriggers() {
  const { editorStore } = useEditorContext();
  const transformTimer = useRef<Timeout>();
  const viewRef = useRef<InfiniteViewer | null>(null);

  const resetTimer = () => {
    clearTimeout(transformTimer.current);
    transformTimer.current = setTimeout(() => {
      editorStore.setPanIsTransforming(false);
    }, 300);
  };

  const onScroll = () => {
    resetTimer();
    editorStore.setPanIsTransforming(true);
  };

  const onPinch = (e: OnPinch) => {
    resetTimer();
    editorStore.setZoom(e.zoom);
  };

  return {
    onScroll,
    onPinch,
    viewRef,
  };
}
