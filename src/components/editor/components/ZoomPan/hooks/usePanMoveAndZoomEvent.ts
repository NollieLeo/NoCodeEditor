import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useEventListener } from "ahooks";
import { Timeout } from "ahooks/lib/useRequest/src/types";
import { MutableRefObject, RefObject, useRef } from "react";
import {
  ReactZoomPanPinchProps,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

export function usePanMoveAndZoomEvent(
  ref: RefObject<HTMLDivElement>,
  transformComponentRef: MutableRefObject<ReactZoomPanPinchRef | null>
) {
  const { editorStore } = useEditorContext();
  const transformTimer = useRef<Timeout>();

  useEventListener("wheel", handleWrapperWheel, {
    passive: false,
    target: ref,
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
      setTransform(newPosX, newPosY, scale, 5, "linear");
    }
  }

  const onTransformed: ReactZoomPanPinchProps["onTransformed"] = (_, state) => {
    clearTimeout(transformTimer.current);
    editorStore.setPanIsTransforming(true);
    editorStore.setPanState(state);
    transformTimer.current = setTimeout(() => {
      editorStore.setPanIsTransforming(false);
    }, 200);
  };

  const onInit: ReactZoomPanPinchProps["onInit"] = (panRef) => {
    editorStore.setPanState(panRef.instance.transformState);
  };

  return {
    onTransformed,
    onInit,
  };
}
