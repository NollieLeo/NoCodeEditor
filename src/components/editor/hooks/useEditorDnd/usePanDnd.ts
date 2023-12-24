import { DragInfoFromPanSort, DropInfo } from "@/components/editor/types";
import { useEditorContext } from "../useEditorContext";

export function usePanDnd() {
  const { editorStore } = useEditorContext();
  const onDragStart = (dragInfo: DragInfoFromPanSort) => {
    editorStore.setDraggingInfo(dragInfo);
  };

  const onDragEnd = (dragInfo: DragInfoFromPanSort, dropInfo: DropInfo) => {
    const { parentId, id: fromId } = dragInfo;
    const { id: toId } = dropInfo
    editorStore.movePos(parentId, fromId, toId);
  };

  return {
    onDragStart,
    onDragEnd,
  };
}
