import {
  CollisionDetection,
  closestCenter,
  rectIntersection,
} from "@dnd-kit/core";
import { useEditorContext } from "./useEditorContext";
import { DragOrigin } from "../types";
import { useCallback } from "react";

export function useEditorCollisionDetection() {
  const { editorStore } = useEditorContext();

  const handleCollisionDetection: CollisionDetection = useCallback(
    (args) => {
      // 当拖拽的元素为面板中的排序拖拽的时候，例如flex grid布局元素的排序，使用最靠近droppable元素的中心算法检测
      if (editorStore.draggingInfo?.from === DragOrigin.PAN_SORT) {
        return closestCenter(args);
      }
      // 否则为默认的rect边缘检测
      return rectIntersection(args);
    },
    [editorStore.draggingInfo?.from]
  );

  return handleCollisionDetection;
}
