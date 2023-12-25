import { COMPONENTS_INFO } from "@/components/editor/constants";
import {
  ComponentTypes,
  DragInfoFromSideAdd,
  DropInfo,
} from "@/components/editor/types";
import { uniqueId } from "lodash-es";
import { useEditorContext } from "../useEditorContext";

// TODO
function generateNewNode(type: ComponentTypes, parentId: string) {
  const newNodeDefaultData = COMPONENTS_INFO[type];
  const newNodeId = `${type}-${uniqueId()}`;
  const newNode: any = {
    id: newNodeId,
    parentId,
    type: type,
    data: newNodeDefaultData.defaultData,
  };
  if ([ComponentTypes.CONTAINER].includes(type)) {
    newNode.childNodes = [];
  }
  return newNode;
}

export function useSideDnd() {
  const { editorStore } = useEditorContext();
  const onDragStart = (dragInfo: DragInfoFromSideAdd) => {
    editorStore.setDraggingInfo(dragInfo);
  };

  const onDragEnd = (dragInfo: DragInfoFromSideAdd, dropInfo: DropInfo) => {
    const { type } = dragInfo;
    const { id: parentId } = dropInfo;
    const newNode = generateNewNode(type, parentId);
    editorStore.addNode(newNode, parentId);
    requestIdleCallback(() => {
      editorStore.setFocusedNodeId(newNode.id);
    });
  };

  return {
    onDragStart,
    onDragEnd,
  };
}
