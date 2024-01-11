import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import {
  snapCenterToCursor,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { useMemo } from "react";

export function useOverlayModifiers() {
  const {
    editorStore: { draggingInfo },
  } = useEditorContext();

  const overlayModifiers = useMemo(() => {
    if (draggingInfo?.from === DragOrigin.SIDE_ADD) {
      return [snapCenterToCursor];
    }
    if (draggingInfo?.from === DragOrigin.SORT) {
      return [];
    }
    return [restrictToWindowEdges];
  }, [draggingInfo?.from]);

  return overlayModifiers;
}
