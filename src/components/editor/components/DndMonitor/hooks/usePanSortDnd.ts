import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragInfoFromPanSort, DropInfo } from "@/components/editor/types";

export function usePanSortDnd() {
  const { editorStore } = useEditorContext();

  const onDragOver = (
    dragInfo: DragInfoFromPanSort,
    overInfo?: DropInfo | null
  ) => {
    if (!overInfo || dragInfo.id === overInfo.id) {
      return;
    }
    const { parentId: dragParentId, id: fromId } = dragInfo;
    const { id: toId, parentId: dropParentId } = overInfo;
    // 确保其为同层级拖拽排序
    if (!dropParentId || !dragParentId || dropParentId !== dragParentId) {
      return;
    }
    editorStore.movePos(dropParentId, fromId, toId);
  };

  const onDragEnd = (dragInfo: DragInfoFromPanSort) => {
    const { parentId, id } = dragInfo;
    if (!parentId) {
      return;
    }
    editorStore.setFocusedInfo({ id });
  };

  return {
    onDragOver,
    onDragEnd,
  };
}
