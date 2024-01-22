import { useDom } from "@/components/editor/hooks/useDom";
import { DragInfo } from "@/components/editor/types";
import { DragEndEvent } from "@dnd-kit/core";
import { useSelectComponent } from "@/components/editor/hooks/useSelectComponent";
import { useEditorTriggers } from "@/components/editor/hooks/useEditorTriggers";

export function useMoveDnd() {
  const { getDom } = useDom();
  const { onSelectComponent } = useSelectComponent();
  const { onUpdateAttrByCompId } = useEditorTriggers();

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
    onUpdateAttrByCompId(dragId, "style", style);
    onSelectComponent(dragId);
  };

  return { onDragEnd };
}
