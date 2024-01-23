import { useEditorTriggers } from "@/components/editor/hooks/useEditorTriggers";
import { DragInfoFromPanSort, DropInfo } from "@/components/editor/types";

export function usePanSortDnd() {
  const { onMoveChildPosByCompId } = useEditorTriggers();

  const onDragOver = (
    dragInfo: DragInfoFromPanSort,
    overInfo?: DropInfo | null
  ) => {
    if (!overInfo) {
      return;
    }
    const { id: fromId } = dragInfo;
    const { id: toId } = overInfo;
    onMoveChildPosByCompId(fromId, toId);
  };

  return {
    onDragOver,
  };
}
