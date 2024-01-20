import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useComponentInfo } from "@/components/editor/hooks/useComponentInfo";
import { DragInfoFromPanSort, DropInfo } from "@/components/editor/types";

export function usePanSortDnd() {
  const { editorStore } = useEditorContext();
  const { getNodeParentInfo } = useComponentInfo();

  const onDragOver = (
    dragInfo: DragInfoFromPanSort,
    overInfo?: DropInfo | null
  ) => {
    if (!overInfo || dragInfo.id === overInfo.id) {
      return;
    }
    const { id: fromId } = dragInfo;
    const { id: toId } = overInfo;
    const dragParent = getNodeParentInfo(fromId);
    const dropParent = getNodeParentInfo(toId);
    // 确保其为同层级拖拽排序
    if (!dragParent || !dropParent || dragParent.id !== dropParent?.id) {
      return;
    }
    editorStore.movePos(dropParent.id, fromId, toId);
  };

  const onDragEnd = (dragInfo: DragInfoFromPanSort) => {
    const { id } = dragInfo;
    editorStore.setFocusedInfo({ id });
  };

  return {
    onDragOver,
    onDragEnd,
  };
}
