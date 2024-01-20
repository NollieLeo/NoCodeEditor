import { useDragInfo } from "@/components/editor/hooks/useDragInfo";
import { useComponentInfo } from "@/components/editor/hooks/useComponentInfo";
import {
  DragOrigin,
  ComponentTypes,
  DropInfo,
  ComponentInfo,
} from "@/components/editor/types";
import { useMemo } from "react";

export const useDroppableConfig = (schemaData: ComponentInfo) => {
  const { childsId, parentId, type, id } = schemaData;
  const { getComponentInfo } = useComponentInfo();

  const dragInfo = useDragInfo();

  const droppable = useMemo(() => {
    if (!dragInfo) {
      return false;
    }
    if (dragInfo?.from === DragOrigin.SIDE_ADD) {
      return (
        [ComponentTypes.PAGE, ComponentTypes.CONTAINER].includes(type) &&
        !!childsId
      );
    }
    const dragSchema = getComponentInfo(dragInfo.id);
    return parentId === dragSchema.parentId;
  }, [childsId, dragInfo, getComponentInfo, parentId, type]);

  const droppableData = useMemo<DropInfo>(() => {
    return {
      id,
    };
  }, [id]);

  return {
    droppableData,
    droppable,
  };
};
