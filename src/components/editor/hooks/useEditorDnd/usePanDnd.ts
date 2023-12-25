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

  const onDragOver = (dragInfo: DragInfoFromPanSort, dropInfo: DropInfo) => {
    const { parentId: dragParentId, id: fromId } = dragInfo;
    const { id: toId, parentId: dropParentId } = dropInfo;
    if (!dropParentId || !dragParentId || dropParentId !== dragParentId) {
      return;
    }
    editorStore.setOverInfo(dropInfo);
    editorStore.movePos(dropParentId, fromId, toId);
  };

  const onDragEnd = (dragInfo: DragInfoFromPanSort, dropInfo: DropInfo) => {
    const { parentId, id: fromId } = dragInfo;
    if (!parentId) {
      return;
    }
    console.log("dropInfo", dropInfo);
    setTimeout(() => {
      editorStore.setFocusedNodeId(fromId);
    }, 1);
  };

  return {
    onDragOver,
    onDragStart,
    onDragEnd,
  };
}
