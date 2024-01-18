import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { createNewNode } from "@/components/editor/utils/createNewNode";
import { useEditorInsertTarget } from "@/components/editor/hooks/useEditorInsertTarget";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragEndEvent } from "@dnd-kit/core";

export function useSideDnd() {
  const { editorStore } = useEditorContext();
  const getInsertInfo = useEditorInsertTarget();

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    const { type } = active.data.current as DragInfoFromSideAdd;
    const dropInfo = over?.data.current as DropInfo;
    const insertInfo = getInsertInfo();

    if (insertInfo && dropInfo) {
      const { id: parentId } = dropInfo;
      const newNode = createNewNode(type, parentId);
      editorStore.addNode(newNode, parentId, insertInfo?.insertIdx);
      requestIdleCallback(() => {
        editorStore.setFocusedInfo({ id: newNode.id });
      });
    }
  };

  return {
    onDragEnd,
  };
}
