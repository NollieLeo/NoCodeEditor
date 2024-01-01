import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { useEditorContext } from "../useEditorContext";
import { createNewNode } from "@/components/editor/utils/createNewNode";
import { useEditorInsertTarget } from "../useEditorInsertTarget";

export function useSideDnd() {
  const { editorStore } = useEditorContext();

  const getInsertInfo = useEditorInsertTarget();

  const onDragStart = (dragInfo: DragInfoFromSideAdd) => {
    editorStore.setDraggingInfo(dragInfo);
  };

  const onDragMove = (dragInfo: DragInfoFromSideAdd, overInfo: DropInfo) => {
    const { id } = dragInfo;
    const dragRect = document.getElementById(id)?.getBoundingClientRect();
    if (!dragRect) {
      return;
    }
    if (overInfo.accepts) {
      editorStore.setOverInfo(overInfo);
    }
  };

  const onDragEnd = (dragInfo: DragInfoFromSideAdd, dropInfo: DropInfo) => {
    const { type } = dragInfo;
    const { id: parentId } = dropInfo;
    const insertInfo = getInsertInfo();
    const newNode = createNewNode(type, parentId);
    editorStore.addNode(newNode, parentId, insertInfo?.insertIdx);
    requestIdleCallback(() => {
      editorStore.setFocusedInfo({ id: newNode.id });
      editorStore.setOverInfo(null);
    });
  };

  return {
    onDragStart,
    onDragEnd,
    onDragMove,
  };
}
