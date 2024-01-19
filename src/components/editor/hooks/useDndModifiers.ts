import { Modifier } from "@dnd-kit/core";
import { useCallback, useMemo } from "react";
import { useEditorContext } from "./useEditorContext";
import { DragInfo, DragOrigin } from "../types";

export default function useDndModifiers() {
  const {
    editorStore: { zoom },
  } = useEditorContext();
  const distanceFormatModifier: Modifier = useCallback(
    (args) => {
      const { transform, active } = args;
      const formatTransform = {
        ...transform,
      };
      if (active) {
        const { from } = active.data.current as DragInfo;
        if (from === DragOrigin.MOVE) {
          formatTransform.x = formatTransform.x / zoom;
          formatTransform.y = formatTransform.y / zoom;
        }
      }
      return formatTransform;
    },
    [zoom]
  );

  return useMemo(() => [distanceFormatModifier], [distanceFormatModifier]);
}
