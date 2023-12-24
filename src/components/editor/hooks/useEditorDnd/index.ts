import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { transaction } from "mobx";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin, DragInfo, DropInfo } from "@/components/editor/types";
import { useSideDnd } from "./useSideDnd";
import { usePanDnd } from "./usePanDnd";

export default function useEditorDnd() {
  const { editorStore } = useEditorContext();
  const { onDragStart: onSideDragStart, onDragEnd: onSideDragEnd } =
    useSideDnd();
  const { onDragStart: onPanDragStart, onDragEnd: onPanDragEnd } = usePanDnd();

  const onDragStart = ({ active }: DragStartEvent) => {
    const { data } = active;
    if (!data.current) {
      throw new Error("dragging target must bind drag info");
    }
    const dragInfo = data.current as DragInfo;
    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
        onSideDragStart(dragInfo);
        break;
      case DragOrigin.PAN_SORT:
        onPanDragStart(dragInfo);
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const { data: activeData } = active;
    const { data: overData } = over || {};
    if (!activeData.current) {
      throw new Error("dragging item must bind data");
    }
    if (!over) {
      editorStore?.setOverNodeId(null);
      return;
    }
    const dragInfo = activeData.current as DragInfo;
    const dropInfo = overData?.current as DropInfo;
    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
        onSideDragEnd(dragInfo, dropInfo);
        break;
      case DragOrigin.PAN_SORT:
        onPanDragEnd(dragInfo, dropInfo);
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
    transaction(() => {
      editorStore.setOverNodeId(null);
      editorStore.setDraggingInfo(null);
    });
  };

  const onDragOver = ({ over }: DragOverEvent) => {
    editorStore.setOverNodeId(over ? String(over.id) : null);
  };

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
  };
}
