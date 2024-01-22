import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, memo, useRef } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import InfiniteViewer, { ScrollCenterOptions } from "react-infinite-viewer";
import { useViewerTriggers } from "./hooks/useViewTriggers";

import "./index.scss";
import { useEventListeners } from "./hooks/useEventListeners";

export interface ViewportRefs {
  scrollCenter: (options?: ScrollCenterOptions | undefined) => boolean;
}

const ViewportComp: FC<PropsWithChildren> = observer((props) => {
  const { children } = props;
  const {
    editorStore: { zoom },
  } = useEditorContext();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { viewRef, onPinch, onScroll } = useViewerTriggers();

  useEventListeners(wrapperRef);

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
        pinchThreshold={50}
        threshold={0}
        zoom={zoom}
        onPinch={onPinch}
        onScroll={onScroll}
        useOverflowScroll={false}
        useResizeObserver
      >
        <div className="editor-viewport-container">{children}</div>
      </InfiniteViewer>
    </div>
  );
});

export const Viewport = memo(ViewportComp);
