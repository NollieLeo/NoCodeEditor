import { DragInfoFromPanSort, DropInfo } from "@/components/editor/types";
import { useEditorContext } from "../useEditorContext";
import { transaction } from "mobx";

export function usePanSortDnd() {
  const { editorStore } = useEditorContext();
  const onDragStart = (dragInfo: DragInfoFromPanSort) => {
    transaction(() => {
      editorStore.setFocusedNodeId(null);
      editorStore.setDraggingInfo(dragInfo);
    });
  };

  const onDragOver = (dragInfo: DragInfoFromPanSort, overInfo: DropInfo) => {
    const { parentId: dragParentId, id: fromId } = dragInfo;
    const { id: toId, parentId: dropParentId } = overInfo;
    // 确保其为同层级拖拽排序
    if (!dropParentId || !dragParentId || dropParentId !== dragParentId) {
      return;
    }
    editorStore.setOverInfo(overInfo);
    editorStore.movePos(dropParentId, fromId, toId);
  };

  const onDragEnd = (dragInfo: DragInfoFromPanSort) => {
    const { parentId, id: fromId } = dragInfo;
    if (!parentId) {
      return;
    }
    // console.log("dropInfo", dropInfo);
    editorStore.setFocusedNodeId(fromId);
  };

  return {
    onDragOver,
    onDragStart,
    onDragEnd,
  };
}
