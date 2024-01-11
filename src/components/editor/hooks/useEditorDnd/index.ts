import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { transaction } from "mobx";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin, DragInfo, DropInfo } from "@/components/editor/types";
import { useSideDnd } from "./useSideDnd";
import { usePanSortDnd } from "./usePanSortDnd";
import { useMoveDnd } from "./useMoveDnd";

export default function useEditorDnd() {
  const { editorStore } = useEditorContext();
  const {
    onDragStart: onSideDragStart,
    onDragEnd: onSideDragEnd,
    onDragMove: onSideDragMove,
  } = useSideDnd();

  const {
    onDragStart: onPanDragStart,
    onDragEnd: onPanDragEnd,
    onDragOver: onPanDragOver,
  } = usePanSortDnd();

  const {
    onDragStart: onPanMoveStart,
    onDragEnd: onPanMoveEnd,
    onDragMove: onPanDragMove,
  } = useMoveDnd();

  const onDragStart = ({ active }: DragStartEvent) => {
    const { data, rect } = active;
    if (!data.current) {
      throw new Error("dragging target must bind drag info");
    }
    editorStore.setHoverNodeId(null);
    const dragInfo = {
      ...data.current,
      rect: rect.current.translated,
    } as DragInfo;
    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
        onSideDragStart(dragInfo);
        break;
      case DragOrigin.SORT:
        onPanDragStart(dragInfo);
        break;
      case DragOrigin.MOVE:
        onPanMoveStart(dragInfo);
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const { data: activeData } = active;
    if (!activeData.current) {
      throw new Error("dragging item must bind data");
    }
    transaction(() => {
      editorStore.setDraggingInfo(null);
      editorStore.setOverInfo(null);
    });
    if (!over) {
      return;
    }
    const { data: overData } = over;
    const dragInfo = activeData.current as DragInfo;
    const dropInfo = overData?.current as DropInfo;
    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
        onSideDragEnd(dragInfo, dropInfo);
        break;
      case DragOrigin.SORT:
        onPanDragEnd(dragInfo);
        break;
      case DragOrigin.MOVE:
        onPanMoveEnd(dragInfo);
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
  };

  const onDragOver = ({ over, active }: DragOverEvent) => {
    const { data: activeData, rect: activeRect } = active;
    if (!activeData.current) {
      throw new Error("dragging item must bind data");
    }
    if (!over) {
      editorStore?.setOverInfo(null);
      return;
    }
    const { data: overData, rect: overRect } = over;
    const dragInfo = {
      ...activeData.current,
      rect: activeRect.current.translated,
    } as DragInfo;

    const overInfo = {
      ...overData.current,
      rect: overRect,
    } as DropInfo;

    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
      case DragOrigin.MOVE:
        break;
      case DragOrigin.SORT:
        onPanDragOver(dragInfo, overInfo);
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
  };

  const onDragMove = ({ over, active }: DragMoveEvent) => {
    const { data: activeData, rect: activeRect } = active;
    if (!activeData.current) {
      throw new Error("dragging item must bind data");
    }
    const { data: overData, rect: overRect } = over || {};
    const dragInfo = {
      ...activeData.current,
      rect: activeRect.current.translated,
    } as DragInfo;

    const overInfo = {
      ...overData?.current,
      rect: overRect,
    } as DropInfo;

    editorStore.setDraggingInfo(dragInfo);

    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
        onSideDragMove(dragInfo, overInfo);
        break;
      case DragOrigin.SORT:
        break;
      case DragOrigin.MOVE:
        onPanDragMove(dragInfo);
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
  };

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragMove,
  };
}
