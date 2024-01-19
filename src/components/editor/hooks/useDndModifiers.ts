import { Modifier } from "@dnd-kit/core";
import { useCallback, useMemo } from "react";
import { useEditorContext } from "./useEditorContext";
import { DragInfo, DragOrigin } from "../types";

export default function useDndModifiers() {
  const {
    editorStore: {
      panState: { scale },
    },
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
          formatTransform.x = formatTransform.x / scale;
          formatTransform.y = formatTransform.y / scale;
        }
      }
      return formatTransform;
    },
    [scale]
  );

  return useMemo(() => [distanceFormatModifier], [distanceFormatModifier]);
}
