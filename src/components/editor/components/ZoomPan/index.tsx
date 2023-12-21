import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useEventListener } from "ahooks";
import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, memo, useRef } from "react";
import { Tools } from "../Tools";
import { useEditorContext } from "../../hooks/useEditorContext";
import { DEFAULT_PANE_PROPS } from "./constants";

import "./index.scss";

const ZoomPanComp: FC<PropsWithChildren> = observer((props) => {
  const { children } = props;
  const { editorStore } = useEditorContext();
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEventListener("wheel", handleWrapperWheel, {
    passive: false,
    target: wrapperRef,
  });

  function handleWrapperWheel(e: WheelEvent) {
    e.preventDefault();
    const { deltaX, deltaY } = e;
    const tranformeComp = transformComponentRef.current;
    if (tranformeComp) {
      const { instance, setTransform } = tranformeComp;
      const {
        transformState: { positionX, positionY, scale },
      } = instance;
      const newPosX = positionX - deltaX / scale;
      const newPosY = positionY - deltaY / scale;
      setTransform(newPosX, newPosY, scale, 10, "linear");
    }
  }

  return (
    <div
      className="editor-pane"
      ref={wrapperRef}
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => {
        editorStore.cleanUpHelperNode();
      }}
    >
      <TransformWrapper
        {...DEFAULT_PANE_PROPS}
        ref={transformComponentRef}
        onInit={(ref) => {
          editorStore.setPanState(ref.instance.transformState);
        }}
        onTransformed={(_, state) => editorStore.setPanState(state)}
      >
        {/* -------------- Helper Tools -------------- */}
        <Tools />
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
