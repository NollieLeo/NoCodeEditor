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

  const {
    onDragStart: onPanDragStart,
    onDragEnd: onPanDragEnd,
    onDragOver: onPanDragOver,
  } = usePanDnd();

  const onDragStart = ({ active }: DragStartEvent) => {
    const { data, rect } = active;
    if (!data.current) {
      throw new Error("dragging target must bind drag info");
    }
    const dragInfo = {
      ...data.current,
      rect: rect.current.translated,
    } as DragInfo;
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
      editorStore.setDraggingInfo(null);
    });
  };

  const onDragOver = ({ over, active }: DragOverEvent) => {
    const { data: activeData, rect } = active;
    if (!activeData.current) {
      throw new Error("dragging item must bind data");
    }
    if (!over) {
      editorStore?.setOverInfo(null);
      return;
    }
    const dragInfo = {
      ...activeData.current,
      rect: rect.current.translated,
    } as DragInfo;

    const overInfo = {
      ...over.data.current,
      rect: over.rect,
    } as DropInfo;

    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
        editorStore.setOverInfo(overInfo);
        break;
      case DragOrigin.PAN_SORT:
        onPanDragOver(dragInfo, overInfo);
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
  };

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
  };
}
