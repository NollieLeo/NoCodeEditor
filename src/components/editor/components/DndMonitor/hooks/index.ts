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
  const { onDragEnd: onSideDragEnd } = useSideDnd();
  const { onDragOver: onPanDragOver, onDragEnd: onPanSortEnd } =
    usePanSortDnd();
  const { onDragEnd: onPanMoveEnd } = useMoveDnd();

  const onDragStart = ({ active }: DragStartEvent) => {
    const { data } = active;
    if (!data.current) {
      throw new Error("dragging target must bind drag info");
    }
    const dragInfo = data.current as DragInfo;
    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
      case DragOrigin.SORT:
      case DragOrigin.MOVE:
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
    transaction(() => {
      editorStore.setHoverNodeId(null);
      editorStore.setFocusedInfo(null);
    });
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const { data: activeData } = active;
    if (!activeData.current) {
      throw new Error("dragging item must bind data");
    }
    const dragInfo = activeData.current as DragInfo;
    const overInfo = over?.data.current as DropInfo;

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

  const onDragMove = ({ active }: DragMoveEvent) => {
    const { data: activeData } = active;
    if (!activeData.current) {
      throw new Error("dragging item must bind data");
    }
    const dragInfo = activeData.current as DragInfo;

    switch (dragInfo.from) {
      case DragOrigin.SIDE_ADD:
      case DragOrigin.SORT:
      case DragOrigin.MOVE:
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active } = e;
    const { data: activeData } = active;
    if (!activeData.current) {
      throw new Error("dragging item must bind data");
    }

    const dragInfo = activeData.current as DragInfo;

    switch (dragInfo.from) {
      case DragOrigin.SORT:
        onPanSortEnd(dragInfo);
        break;
      case DragOrigin.SIDE_ADD:
        onSideDragEnd(e);
        break;
      case DragOrigin.MOVE:
        onPanMoveEnd(e);
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
