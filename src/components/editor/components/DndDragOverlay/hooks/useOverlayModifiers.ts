import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { Modifier } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import { useCallback, useMemo } from "react";
import { DragOrigin } from "@/components/editor/types";

export function useOverlayModifiers() {
  const {
    editorStore: { draggingInfo },
  } = useEditorContext();

  const distanceFormatModifier: Modifier = useCallback(
    (args) => {
      let modifier = snapCenterToCursor;
      if (draggingInfo?.from === DragOrigin.MOVE) {
        modifier = restrictToWindowEdges;
      }
      const transform = modifier(args);
      const formatedTransform: Transform = {
        ...transform,
        x: Math.floor(transform.x),
        y: Math.floor(transform.y),
      };
      return formatedTransform;
    },
    [draggingInfo?.from]
  );

  const overlayModifiers = useMemo<Modifier[]>(() => {
    return [distanceFormatModifier];
  }, [distanceFormatModifier]);

  return overlayModifiers;
}
