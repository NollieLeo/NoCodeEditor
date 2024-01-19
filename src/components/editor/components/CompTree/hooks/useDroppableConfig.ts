import { useGetDragInfo } from "@/components/editor/hooks/useGetDragInfo";
import { useGetNodeInfo } from "@/components/editor/hooks/useGetNodeInfo";
import {
  DragOrigin,
  ComponentTypes,
  DropInfo,
  SchemaData,
} from "@/components/editor/types";
import { useMemo } from "react";

export const useDroppableConfig = (schemaData: SchemaData) => {
  const { childNodes, parentId, type, id } = schemaData;
  const { getNodeInfo } = useGetNodeInfo();

  const dragInfo = useGetDragInfo();

  const droppable = useMemo(() => {
    if (!dragInfo) {
      return false;
    }
    if (dragInfo?.from === DragOrigin.SIDE_ADD) {
      return (
        [ComponentTypes.PAGE, ComponentTypes.CONTAINER].includes(type) &&
        !!childNodes
      );
    }
    const dragSchema = getNodeInfo(dragInfo.id);
    return parentId === dragSchema.parentId;
  }, [childNodes, dragInfo, getNodeInfo, parentId, type]);

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
