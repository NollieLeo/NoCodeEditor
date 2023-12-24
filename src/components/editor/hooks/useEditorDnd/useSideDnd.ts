import { COMPONENTS_INFO } from "@/components/editor/constants";
import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { uniqueId } from "lodash-es";
import { useEditorContext } from "../useEditorContext";

export function useSideDnd() {
  const { editorStore } = useEditorContext();
  const onDragStart = (dragInfo: DragInfoFromSideAdd) => {
    editorStore.setDraggingInfo(dragInfo);
  };

  const onDragEnd = (dragInfo: DragInfoFromSideAdd, dropInfo: DropInfo) => {
    const { type: addCompType } = dragInfo;
    const { id: parentId } = dropInfo;
    const newNodeDefaultData = COMPONENTS_INFO[addCompType];
    const newNodeId = uniqueId();
    editorStore.addNode(
      {
        id: newNodeId,
        parentId,
        type: addCompType,
        data: newNodeDefaultData.defaultData,
        childNodes: [],
      },
      parentId
    );
    requestIdleCallback(() => {
      editorStore.setFocusedNodeId(newNodeId);
    });
  };

  return {
    onDragStart,
    onDragEnd,
  };
}
