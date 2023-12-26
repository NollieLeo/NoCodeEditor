import {
  CollisionDetection,
  closestCenter,
  rectIntersection,
  pointerWithin,
} from "@dnd-kit/core";
import { useEditorContext } from "./useEditorContext";
import { DragOrigin } from "../types";
import { useCallback } from "react";

export function useEditorCollisionDetection() {
  const {
    editorStore: { draggingInfo },
  } = useEditorContext();

  const handleCollisionDetection: CollisionDetection = useCallback(
    (args) => {
      if (!draggingInfo) {
        return rectIntersection(args);
      }
      const { from } = draggingInfo;
      switch (from) {
        // 当拖拽的元素为面板中的排序拖拽的时候，例如flex grid布局元素的排序，使用最靠近droppable元素的中心算法检测
        case DragOrigin.PAN_SORT:
          return closestCenter(args);
        case DragOrigin.SIDE_ADD:
          return pointerWithin(args);
        default:
          throw new Error(`unknow drag origin: ${from}`);
      }
    },
    [draggingInfo]
  );

  return handleCollisionDetection;
}
