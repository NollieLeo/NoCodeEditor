import { DRAGGABLE_COMPONENTS } from "@/components/editor/constants";
import {
  DragOrigin,
  DragInfoFromPanMove,
  DragInfoFromPanSort,
  ComponentInfo,
} from "@/components/editor/types";
import { isAbsoluteOrFixed } from "@/components/editor/utils/layout";
import { useMemo } from "react";

export const useDraggableConfig = (schema: ComponentInfo) => {
  const { type, attrs, id } = schema;

  const draggable = useMemo(() => {
    return DRAGGABLE_COMPONENTS.includes(type);
  }, [type]);

  const draggableOrigin = useMemo(() => {
    let from = DragOrigin.SORT;
    if (isAbsoluteOrFixed(attrs.style)) {
      from = DragOrigin.MOVE;
    }
    return from;
  }, [attrs.style]);

  const draggableData = useMemo<
    DragInfoFromPanMove | DragInfoFromPanSort
  >(() => {
    return {
      from: draggableOrigin,
      id,
    };
  }, [draggableOrigin, id]);

  return {
    draggable,
    draggableData,
  };
};
