import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { CompTree } from "@/components/editor/components/CompTree";

/**
 * @description 面板内部拖拽元素的时候的overlay
 */
const PanDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();
  const { draggingInfo, nodesMap, panState } = editorStore;

  const activePanComp = useMemo(() => {
    if (!draggingInfo || draggingInfo.from !== DragOrigin.PAN_SORT) {
      return <></>;
    }
    const { id } = draggingInfo;
    const targetDom = document.getElementById(id);
    if (id && nodesMap[id] && targetDom && panState?.scale) {
      const { width, height } = targetDom.getBoundingClientRect();
      return (
        <div
          style={{
            height: height * (1 / panState.scale),
            width: width * (1 / panState.scale),
            transform: `scale(${panState.scale})`,
          }}
        >
          <CompTree rootId={id} withDnd={false} />
        </div>
      );
    }
  }, [draggingInfo, nodesMap, panState?.scale]);

  return activePanComp;
});

export const PanDragOverlayComp = memo(PanDragOverlayTmpl);
