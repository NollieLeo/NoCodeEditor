import { Modifier } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import { useCallback, useMemo } from "react";
import { DragInfo, DragOrigin } from "@/components/editor/types";

export function useOverlayModifiers() {
  const distanceFormatModifier: Modifier = useCallback(
    (args) => {
      const { active } = args;
      const { from } = (active?.data.current as DragInfo) || {};
      let modifier = restrictToWindowEdges;
      if (from === DragOrigin.SIDE_ADD) {
        modifier = snapCenterToCursor;
      }
      const transform = modifier(args);
      const formatedTransform: Transform = {
        ...transform,
        x: Math.floor(transform.x),
        y: Math.floor(transform.y),
      };
      return formatedTransform;
    },
    []
  );

  const overlayModifiers = useMemo<Modifier[]>(() => {
    return [distanceFormatModifier];
  }, [distanceFormatModifier]);

  return overlayModifiers;
}
