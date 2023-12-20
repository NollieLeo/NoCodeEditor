import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchProps,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useEventListener } from "ahooks";
import "./index.scss";
import { FC, PropsWithChildren, useRef } from "react";

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

export const Pane: FC<PropsWithChildren> = (props) => {
  const { children } = props;

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
      setTransform(
        positionX - deltaX / scale,
        positionY - deltaY / scale,
        scale,
        10,
        "linear"
      );
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
    >
      <TransformWrapper {...DEFAULT_PANE_PROPS} ref={transformComponentRef}>
        <TransformComponent
          wrapperClass="editor-pane-wrapper"
          contentClass="editor-pane-content"
        >
          {children}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
