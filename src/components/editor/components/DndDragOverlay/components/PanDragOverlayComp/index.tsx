import { CSSProperties, FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { CompTree } from "@/components/editor/components/CompTree";

/**
 * @description 面板内部拖拽元素的时候的overlay
 */
const PanDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();
  const { draggingInfo, panState } = editorStore;

  const dragId = draggingInfo?.id;
  const dragOrigin = draggingInfo?.from;
  const panScale = panState?.scale || 1;

  const activePanComp = useMemo(() => {
    if (!dragId || dragOrigin !== DragOrigin.SORT) {
      return <></>;
    }
    if (dragId && panScale) {
      const wrapperStyle: CSSProperties = {
        transform: `scale(${panScale})`,
        position: "relative",
      };
      return (
        <div style={wrapperStyle}>
          <CompTree rootId={dragId} withDnd={false} />
        </div>
      );
    }
  }, [dragId, dragOrigin, panScale]);

  return activePanComp;
});

export const PanDragOverlayComp = memo(PanDragOverlayTmpl);
