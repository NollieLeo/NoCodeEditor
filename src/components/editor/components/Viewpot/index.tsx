import { observer } from "mobx-react-lite";
import { CSSProperties, FC, PropsWithChildren, memo, useMemo, useRef, useState } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import InfiniteViewer, { ScrollCenterOptions } from "react-infinite-viewer";
import { useViewerTriggers } from "./hooks/useViewTriggers";

import "./index.scss";
import { useEventListeners } from "./hooks/useEventListeners";
import { useSize, useUpdateEffect } from "ahooks";

export interface ViewportRefs {
  scrollCenter: (options?: ScrollCenterOptions | undefined) => boolean;
}

const ViewportComp: FC<PropsWithChildren> = observer((props) => {
  const { children } = props;
  const {
    editorStore: { zoom },
    editorStore,
  } = useEditorContext();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { viewRef, onPinch, onScroll } = useViewerTriggers();

  useEventListeners(wrapperRef);

  const size = useSize(containerRef);

  const containerStyle = useMemo<CSSProperties>(
    () => ({
      visibility: visible ? "visible" : "hidden",
    }),
    [visible]
  );

  useUpdateEffect(() => {
    viewRef.current?.setZoom(0.8);
    viewRef.current?.scrollCenter({ horizontal: true, vertical: true });
    editorStore.setZoom(0.8);
    setVisible(true);
  }, [size?.width]);

  return (
    <div className="editor-viewport" ref={wrapperRef}>
      <InfiniteViewer
        ref={viewRef}
        className="editor-viewport-infinity"
        usePinch
        useWheelPinch
        useWheelScroll
        useAutoZoom={false}
        useMouseDrag={false}
        pinchThreshold={1}
        threshold={0}
        zoom={zoom}
        onPinch={onPinch}
        onScroll={onScroll}
        useOverflowScroll={false}
        useResizeObserver
      >
        <div
          className="editor-viewport-container"
          ref={containerRef}
          style={containerStyle}
        >
          {children}
        </div>
      </InfiniteViewer>
    </div>
  );
});

export const Viewport = memo(ViewportComp);
