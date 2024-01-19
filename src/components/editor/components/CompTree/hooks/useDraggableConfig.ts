import {
  SchemaData,
  ComponentTypes,
  DragOrigin,
  DragInfoFromPanMove,
  DragInfoFromPanSort,
} from "@/components/editor/types";
import { isAbsoluteOrFixed } from "@/components/editor/utils/layout";
import { useMemo } from "react";

export const useDraggableConfig = (schema: SchemaData) => {
  const { type, data, id } = schema;

  const draggable = useMemo(() => {
    return type !== ComponentTypes.PAGE;
  }, [type]);

  const draggableOrigin = useMemo(() => {
    let from = DragOrigin.SORT;
    if (isAbsoluteOrFixed(data.style)) {
      from = DragOrigin.MOVE;
    }
    return from;
  }, [data.style]);

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
