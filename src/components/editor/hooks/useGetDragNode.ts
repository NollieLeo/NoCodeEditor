import { useDndContext } from "@dnd-kit/core";
import { DragInfo } from "../types";
import { useMemo } from "react";

export function useGetDragData() {
  const { active } = useDndContext();

  const dragInfo = useMemo(() => {
    return active?.data.current as DragInfo | null;
  }, [active?.data]);

  return dragInfo;
}
