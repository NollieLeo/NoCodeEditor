import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { Timeout } from "ahooks/lib/useRequest/src/types";
import { MouseEventHandler, useRef } from "react";
import InfiniteViewer, { OnPinch } from "react-infinite-viewer";

export function useViewerTriggers() {
  const { editorStore } = useEditorContext();
  const transformTimer = useRef<Timeout>();
  const viewRef = useRef<InfiniteViewer | null>(null);

  const onScroll = () => {
    clearTimeout(transformTimer.current);
    transformTimer.current = setTimeout(() => {
      editorStore.setPanIsTransforming(false);
    }, 300);
    editorStore.setPanIsTransforming(true);
  };

  const onPinch = (e: OnPinch) => {
    clearTimeout(transformTimer.current);
    transformTimer.current = setTimeout(() => {
      editorStore.setPanIsTransforming(false);
    }, 300);
    editorStore.setPanIsTransforming(true);
    editorStore.setZoom(e.zoom);
  };

  const onContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const targetDom = e.target as HTMLDivElement;
    if (targetDom) {
      editorStore.setFocusedInfo({ id: targetDom.id });
    }
  };

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    editorStore.cleanUpHelperNode();
  };

  return {
    onScroll,
    onPinch,
    onContextMenu,
    onClick,
    viewRef,
  };
}
