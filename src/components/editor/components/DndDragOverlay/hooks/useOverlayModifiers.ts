import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { Modifier } from "@dnd-kit/core";
import {
  snapCenterToCursor,
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { useCallback, useMemo } from "react";

export function useOverlayModifiers() {
  const {
    editorStore: { draggingInfo, panState },
  } = useEditorContext();

  const modifierTransformByScale = useCallback(
    (modifier: Modifier): Modifier => {
      return (args) => {
        const { transform, ...rest } = args;
        const scale = panState?.scale || 1;
        const transformRes = modifier({
          ...rest,
          transform: {
            ...transform,
            scaleX: transform.scaleX * scale,
            scaleY: transform.scaleY * scale,
          },
        });
        return transformRes;
      };
    },
    [panState]
  );

  const overlayModifiers = useMemo(() => {
    if (draggingInfo?.from === DragOrigin.SIDE_ADD) {
      return [snapCenterToCursor];
    }
    if (draggingInfo?.from === DragOrigin.SORT) {
      return [modifierTransformByScale(restrictToParentElement)];
    }
    return [modifierTransformByScale(restrictToWindowEdges)];
  }, [draggingInfo?.from, modifierTransformByScale]);

  return overlayModifiers;
}
