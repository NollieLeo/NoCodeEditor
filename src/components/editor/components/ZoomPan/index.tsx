import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { observer } from "mobx-react-lite";
import { FC, MouseEventHandler, PropsWithChildren, memo, useRef } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DEFAULT_PANE_PROPS } from "./constants";
import { usePanMoveAndZoomEvent } from "./hooks/usePanMoveAndZoomEvent";

import "./index.scss";

const ZoomPanComp: FC<PropsWithChildren> = observer((props) => {
  const { children } = props;
  const { editorStore } = useEditorContext();
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { onTransformed, onInit } = usePanMoveAndZoomEvent(
    wrapperRef,
    transformComponentRef
  );

  const onContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const targetDom = e.target as HTMLDivElement;
    if (targetDom) {
      editorStore.setFocusedInfo({ id: targetDom.id });
    }
  };

  return (
    <div
      className="editor-pane"
      ref={wrapperRef}
      onContextMenu={onContextMenu}
      onClick={() => {
        editorStore.cleanUpHelperNode();
      }}
    >
      <TransformWrapper
        {...DEFAULT_PANE_PROPS}
        ref={transformComponentRef}
        onInit={onInit}
        onTransformed={onTransformed}
      >
        {/* -------------- Real ZoomPan Transformer -------------- */}
        <TransformComponent
          wrapperClass="editor-pane-wrapper"
          contentClass="editor-pane-content"
        >
          {children}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
});

export const ZoomPan = memo(ZoomPanComp);
