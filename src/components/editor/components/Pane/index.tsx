import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchProps,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useEventListener } from "ahooks";
import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, memo, useRef } from "react";
import { Tools } from "../Tools";
import "./index.scss";
import { useBoardContext } from "../../hooks/useBoardContext";

const DEFAULT_PANE_PROPS: ReactZoomPanPinchProps = {
  limitToBounds: false,
  maxScale: 5,
  minScale: 0.2,
  maxPositionX: Infinity,
  minPositionX: -Infinity,
  maxPositionY: Infinity,
  minPositionY: -Infinity,
  centerOnInit: true,
  doubleClick: {
    disabled: true,
  },
  wheel: {
    smoothStep: 0.01,
    wheelDisabled: true,
  },
  pinch: {
    disabled: true,
  },
  panning: {
    allowMiddleClickPan: false,
    allowLeftClickPan: false,
    allowRightClickPan: false,
  },
};

const PaneComp: FC<PropsWithChildren> = observer((props) => {
  const { children } = props;
  const { boardStore } = useBoardContext();

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleWrapperWheel(e: WheelEvent) {
    e.preventDefault();
    const { deltaX, deltaY } = e;
    if (transformComponentRef.current) {
      const {
        instance: {
          transformState: { positionX, positionY, scale },
        },
        setTransform,
      } = transformComponentRef.current;
      const newPosX = positionX - deltaX / scale;
      const newPosY = positionY - deltaY / scale;
      setTransform(newPosX, newPosY, scale, 10, "linear");
      boardStore.setPanState({
        positionX: newPosX,
        positionY: newPosY,
        previousScale: scale,
        scale,
      });
    }
  }

  useEventListener("wheel", handleWrapperWheel, {
    passive: false,
    target: wrapperRef,
  });

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
        onPanning={(e) => console.log(e)}
        onZoom={(ref) => boardStore.setPanState(ref.instance.transformState)}
      >
        <Tools />
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
