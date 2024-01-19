import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { createNewNode } from "@/components/editor/utils/createNewNode";
import { useGetInsertTarget } from "@/components/editor/hooks/useGetInsertTarget";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragEndEvent } from "@dnd-kit/core";

export function useSideDnd() {
  const { editorStore } = useEditorContext();
  const getInsertInfo = useGetInsertTarget();

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    const { type } = active.data.current as DragInfoFromSideAdd;
    const dropInfo = over?.data.current as DropInfo;
    const insertInfo = getInsertInfo();

    if (dropInfo) {
      const { id } = dropInfo;
      const newNode = createNewNode(type, id);
      editorStore.addNode(newNode, id, insertInfo?.insertIdx);
      requestIdleCallback(() => {
        editorStore.setFocusedInfo({ id: newNode.id });
      });
    }
  };

  return {
    onDragEnd,
  };
}
