import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { useEditorContext } from "../useEditorContext";
import { createNewNode } from "@/components/editor/utils/createNewNode";
import { useEditorInsertTarget } from "../useEditorInsertTarget";

export function useSideDnd() {
  const { editorStore } = useEditorContext();

  const getInsertInfo = useEditorInsertTarget();

  const onDragMove = (_dragInfo: DragInfoFromSideAdd, overInfo: DropInfo) => {
    if (overInfo.accepts) {
      editorStore.setOverInfo(overInfo);
    }
  };

  const onDragEnd = (dragInfo: DragInfoFromSideAdd, dropInfo?: DropInfo | null) => {
    const { type } = dragInfo;
    const insertInfo = getInsertInfo();
    if (insertInfo && dropInfo) {
      const { id: parentId } = dropInfo;
      const newNode = createNewNode(type, parentId);
      editorStore.addNode(newNode, parentId, insertInfo?.insertIdx);
      requestIdleCallback(() => {
        editorStore.setFocusedInfo({ id: newNode.id });
        editorStore.setOverInfo(null);
      });
    }
  };

  return {
    onDragEnd,
    onDragMove,
  };
}
