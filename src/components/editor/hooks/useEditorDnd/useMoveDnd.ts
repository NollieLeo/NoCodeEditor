import { DragInfoFromPanMove } from "@/components/editor/types";
import { useEditorContext } from "../useEditorContext";
import { useRafState } from "ahooks";

export function useMoveDnd() {
  const {
    editorStore,
    editorStore: { panState },
  } = useEditorContext();

  const [dragParentRect, setDragParentRect] = useRafState<DOMRect | null>(null);

  const onDragStart = (dragInfo: DragInfoFromPanMove) => {
    const { parentId: dragParentId } = dragInfo;
    if (!dragParentId) {
      return;
    }
    const parentDom = document.getElementById(dragParentId);
    if (!parentDom) {
      return;
    }
    const parentRect = parentDom.getBoundingClientRect();
    setDragParentRect(parentRect);
  };

  const onDragEnd = () => {
    setDragParentRect(null);
  };

  const onDragMove = (dragInfo: DragInfoFromPanMove) => {
    const { rect: dragRect, id: dragId } = dragInfo;
    if (!dragRect || !dragId || !dragParentRect) {
      return;
    }
    const scale = panState?.scale || 1;
    const computedTop = (dragRect.top - dragParentRect.top) / scale;
    const computedLeft = (dragRect.left - dragParentRect.left) / scale;
    const style = {
      top: computedTop,
      left: computedLeft,
    };
    editorStore.updateNodeStyle(style, dragId);
  };

  return { onDragStart, onDragEnd, onDragMove };
}
