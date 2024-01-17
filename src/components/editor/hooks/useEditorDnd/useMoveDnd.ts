import { DragInfoFromPanMove } from "@/components/editor/types";
import { useEditorContext } from "../useEditorContext";
import { useRafState } from "ahooks";

export function useMoveDnd() {
  const {
    editorStore,
    editorStore: {
      panState: { scale },
    },
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

  const onDragEnd = (dragInfo: DragInfoFromPanMove) => {
    setDragParentRect(null);
    editorStore.setFocusedInfo({ id: dragInfo.id });
  };

  const onDragMove = (dragInfo: DragInfoFromPanMove) => {
    const { rect: dragRect, id: dragId } = dragInfo;
    if (!dragRect || !dragId || !dragParentRect) {
      return;
    }
    const computedTop = Math.floor((dragRect.top - dragParentRect.top) / scale);
    const computedLeft = Math.floor(
      (dragRect.left - dragParentRect.left) / scale
    );
    const style = {
      top: computedTop,
      left: computedLeft,
    };
    editorStore.updateNodeStyle(style, dragId);
  };

  return { onDragStart, onDragEnd, onDragMove };
}
