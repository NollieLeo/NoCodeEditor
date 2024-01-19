import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { Timeout } from "ahooks/lib/useRequest/src/types";
import { MouseEventHandler, useEffect, useRef } from "react";
import InfiniteViewer, { OnPinch } from "react-infinite-viewer";

export function useViewerTriggers() {
  const { editorStore } = useEditorContext();
  const transformTimer = useRef<Timeout>();
  const viewRef = useRef<InfiniteViewer | null>(null);

  const onScroll = () => {
    clearTimeout(transformTimer.current);
    editorStore.setPanIsTransforming(true);
    transformTimer.current = setTimeout(() => {
      editorStore.setPanIsTransforming(false);
    }, 200);
  };

  const onPinch = (e: OnPinch) => {
    clearTimeout(transformTimer.current);
    editorStore.setPanIsTransforming(true);
    editorStore.setZoom(e.zoom);
    transformTimer.current = setTimeout(() => {
      editorStore.setPanIsTransforming(false);
    }, 200);
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

  useEffect(() => {
    viewRef.current?.scrollCenter();
  }, []);

  return {
    onScroll,
    onPinch,
    onContextMenu,
    onClick,
    viewRef,
  };
}
