import { DROPPABLE_COMPONENTS } from "@/components/editor/constants";
import { useDragInfo } from "@/components/editor/hooks/useDragInfo";
import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { DragOrigin, DropInfo, ComponentInfo } from "@/components/editor/types";
import { useMemo } from "react";

export const useDroppableConfig = (componentInfo: ComponentInfo) => {
  const { parentId, type, id } = componentInfo;
  const { getComponentInfo } = useGetComponentInfo();
  const dragInfo = useDragInfo();

  const droppable = useMemo(() => {
    if (!dragInfo) return false;
    if (dragInfo?.from === DragOrigin.SIDE_ADD) {
      const isAvaliable = DROPPABLE_COMPONENTS.includes(type);
      return isAvaliable;
    }
    const dragSchema = getComponentInfo(dragInfo.id);
    return parentId === dragSchema.parentId;
  }, [dragInfo, getComponentInfo, parentId, type]);

  const droppableData = useMemo<DropInfo>(
    () => ({
      id,
    }),
    [id]
  );

  return {
    droppableData,
    droppable,
  };
};
