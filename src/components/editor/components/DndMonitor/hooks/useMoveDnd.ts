import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useGetElement } from "@/components/editor/hooks/useGetElement";
import { DragInfo } from "@/components/editor/types";
import { DragEndEvent } from "@dnd-kit/core";

export function useMoveDnd() {
  const { editorStore } = useEditorContext();
  const { getElement } = useGetElement();

  const onDragEnd = (e: DragEndEvent) => {
    const {
      active: { data },
      delta,
    } = e;
    const { x, y } = delta;
    const { id: dragId } = data.current as DragInfo;
    const targetDom = getElement(dragId);
    const computedTop = Math.floor(targetDom.offsetTop + y);
    const computedLeft = Math.floor(targetDom.offsetLeft + x);
    const style = {
      top: computedTop,
      left: computedLeft,
    };
    editorStore.updateNodeStyle(style, dragId);
    editorStore.setFocusedInfo({ id: dragId });
  };

  return { onDragEnd };
}
