import {
  CollisionDetection,
  closestCenter,
  rectIntersection,
  pointerWithin,
} from "@dnd-kit/core";
import { DragOrigin } from "../types";
import { useCallback } from "react";

export function useEditorCollisionDetection() {
  const handleCollisionDetection: CollisionDetection = useCallback((args) => {
    const { active } = args;
    if (!active.data.current) {
      return rectIntersection(args);
    }
    const { from } = active.data.current;
    switch (from) {
      // 当拖拽的元素为面板中的排序拖拽的时候，例如flex grid布局元素的排序，使用最靠近droppable元素的中心算法检测
      case DragOrigin.SORT:
        return closestCenter(args);
      case DragOrigin.SIDE_ADD:
        return pointerWithin(args);
      default:
        return rectIntersection(args);
    }
  }, []);

  return handleCollisionDetection;
}
