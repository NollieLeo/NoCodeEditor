import type { ReactZoomPanPinchProps } from "react-zoom-pan-pinch";

export const DEFAULT_PANE_PROPS: ReactZoomPanPinchProps = {
  limitToBounds: false,
  maxScale: 5,
  minScale: 0.5,
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
