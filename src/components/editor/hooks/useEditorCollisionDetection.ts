import {
  CollisionDetection,
  closestCorners,
  rectIntersection,
} from "@dnd-kit/core";
import { useEditorContext } from "./useEditorContext";
import { DragOrigin } from "../types";
import { useCallback } from "react";

export function useEditorCollisionDetection() {
  const { editorStore } = useEditorContext();

  const handleCollisionDetection: CollisionDetection = useCallback(
    (args) => {
      if (editorStore.draggingInfo?.from === DragOrigin.PAN_SORT) {
        return closestCorners(args);
      }
      return rectIntersection(args);
    },
    [editorStore.draggingInfo?.from]
  );

  return handleCollisionDetection;
}
