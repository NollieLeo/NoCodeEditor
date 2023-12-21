import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useEventListener } from "ahooks";
import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, memo, useRef } from "react";
import { Tools } from "../Tools";
import { useBoardContext } from "../../hooks/useBoardContext";
import { DEFAULT_PANE_PROPS } from "./constants";

import "./index.scss";

const PaneComp: FC<PropsWithChildren> = observer((props) => {
  const { children } = props;
  const { boardStore } = useBoardContext();
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
        boardStore.cleanUpHelperNode();
      }}
    >
      <TransformWrapper
        {...DEFAULT_PANE_PROPS}
        ref={transformComponentRef}
        onInit={(ref) => {
          boardStore.setPanState(ref.instance.transformState);
        }}
        onTransformed={(_, state) => boardStore.setPanState(state)}
      >
        {/* -------------- Helper Tools -------------- */}
        <Tools />

        {/* -------------- Real Pan */}
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

export const Pane = memo(PaneComp);
