import { observer } from "mobx-react-lite";
import { ReactNode, memo } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import InfiniteViewer, { ScrollCenterOptions } from "react-infinite-viewer";
import { useViewerTriggers } from "./hooks/useViewTriggers";

import "./index.scss";

export interface ViewportRefs {
  scrollCenter: (options?: ScrollCenterOptions | undefined) => boolean;
}

export interface ViewportProps {
  children: ReactNode;
}

const ViewportComp = observer((props: ViewportProps) => {
  const { children } = props;
  const {
    editorStore: { zoom },
  } = useEditorContext();

  const { viewRef, onPinch, onScroll, onContextMenu, onClick } =
    useViewerTriggers();

  return (
    <div
      className="editor-viewport"
      onContextMenu={onContextMenu}
      onClick={onClick}
    >
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
      >
        <div className="editor-viewport-container">{children}</div>
      </InfiniteViewer>
    </div>
  );
});

export const Viewport = memo(ViewportComp);
