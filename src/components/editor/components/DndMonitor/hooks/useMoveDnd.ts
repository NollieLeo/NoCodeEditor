import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useDom } from "@/components/editor/hooks/useDom";
import { DragInfo } from "@/components/editor/types";
import { DragEndEvent } from "@dnd-kit/core";
import { useSelectComponent } from "@/components/editor/hooks/useSelectComponent";

export function useMoveDnd() {
  const { editorStore } = useEditorContext();
  const { getDom } = useDom();
  const { onSelectComponent } = useSelectComponent();

  const onDragEnd = (e: DragEndEvent) => {
    const {
      active: { data },
      delta,
    } = e;
    const { x, y } = delta;
    const { id: dragId } = data.current as DragInfo;
    const targetDom = getDom(dragId);
    const computedTop = Math.floor(targetDom.offsetTop + y);
    const computedLeft = Math.floor(targetDom.offsetLeft + x);
    const style = {
      top: computedTop,
      left: computedLeft,
    };
    editorStore.updateNodeStyle(style, dragId);
    onSelectComponent(dragId);
  };

  return { onDragEnd };
}
