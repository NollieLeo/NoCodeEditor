import { DragInfoFromPanSort, DropInfo } from "@/components/editor/types";
import { useEditorContext } from "../useEditorContext";
import { transaction } from "mobx";

export function usePanDnd() {
  const { editorStore } = useEditorContext();
  const onDragStart = (dragInfo: DragInfoFromPanSort) => {
    transaction(() => {
      editorStore.setFocusedNodeId(null);
      editorStore.setDraggingInfo(dragInfo);
    });
  };

  const onDragEnd = (dragInfo: DragInfoFromPanSort, dropInfo: DropInfo) => {
    const { parentId, id: fromId } = dragInfo;
    const { id: toId } = dropInfo;
    transaction(() => {
      editorStore.movePos(parentId, fromId, toId);
      editorStore.setFocusedNodeId(fromId);
    });
  };

  return {
    onDragStart,
    onDragEnd,
  };
}
