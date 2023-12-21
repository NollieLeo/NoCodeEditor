import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { transaction } from "mobx";
import { uniqueId } from "lodash-es";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { ComponentTypes, DragOrigin, DragTarget } from "@/components/editor/types";

export default function useEditorDnd() {
  const { editorStore } = useEditorContext();

  const handleAddNodeFromSide = (
    addType: ComponentTypes,
    addTargetId: string
  ) => {
    const newNode = COMPONENTS_INFO[addType];
    editorStore.createNewNode(
      {
        id: uniqueId(),
        type: addType,
        data: newNode.defaultData,
        childNodes: [],
      },
      String(addTargetId)
    );
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    const { data } = active;
    if (!data.current) {
      throw new Error("dragging target must bind data");
    }
    const dragTarget = data.current as DragTarget;

    switch (dragTarget.from) {
      case DragOrigin.SIDE_ADD:
        editorStore.setDraggingNode(dragTarget);
        break;
      case DragOrigin.PAN:
        editorStore.setDraggingNode(dragTarget);
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const { id: activeId, data } = active;
    const overId = over?.id;
    if (!data.current) {
      throw new Error("dragging target must bind data");
    }
    if (!overId) {
      editorStore?.setOverNodeId(null);
      return;
    }
    const { from } = data.current as DragTarget;
    switch (from) {
      case DragOrigin.SIDE_ADD:
        handleAddNodeFromSide(data.current.componentType, String(overId));
        break;
      case DragOrigin.PAN:
        editorStore.moveNodeTo(String(activeId), String(overId));
        break;
      default:
        throw new Error(`unsupported drag origin`);
    }
    transaction(() => {
      editorStore?.setOverNodeId(null);
      editorStore.setDraggingNode(null);
    });
  };

  const onDragOver = ({ over }: DragOverEvent) => {
    if (over && over.id !== editorStore.overNodeId) {
      editorStore.setOverNodeId(String(over.id));
    }
  };

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
  };
}
