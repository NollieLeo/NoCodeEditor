import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { useRenderComponentsTree } from "@/components/editor/hooks/useRenderComponentsTree";

const PanDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();
  const { draggingInfo, nodesMap, panState } = editorStore;
  const renderCompTree = useRenderComponentsTree(false);

  const activePanComp = useMemo(() => {
    if (!draggingInfo || draggingInfo.from !== DragOrigin.PAN_SORT) {
      return <></>;
    }
    const { id } = draggingInfo;

    if (id && nodesMap[id]) {
      return (
        <div
          style={{
            transform: `scale(${panState?.scale || 1})`,
          }}
        >
          {renderCompTree(id)}
        </div>
      );
    }
  }, [draggingInfo, nodesMap, panState?.scale, renderCompTree]);

  return activePanComp;
});

export const PanDragOverlayComp = memo(PanDragOverlayTmpl);
