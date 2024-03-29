import { useDndContext } from "@dnd-kit/core";
import { DragInfo } from "../types";
import { useMemo } from "react";

export function useDragInfo() {
  const { active } = useDndContext();

  const dragInfo = useMemo(() => {
    return active?.data.current as DragInfo | null;
  }, [active?.id, active?.data]);

  return dragInfo;
}
