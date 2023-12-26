import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { useEditorContext } from "../useEditorContext";
import { createNewNode } from "../../utils/createNewNode";
import { useEditorOverTarget } from "../useEditorOverTarget";

export function useSideDnd() {
  const { editorStore } = useEditorContext();

  const [targetIdx] = useEditorOverTarget();

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
    const newNode = createNewNode(type, parentId);
    editorStore.addNode(newNode, parentId, targetIdx);
    requestIdleCallback(() => {
      editorStore.setFocusedNodeId(newNode.id);
      editorStore.setOverInfo(null);
    });
  };

  return {
    onDragStart,
    onDragEnd,
    onDragMove,
  };
}
