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
  const { draggingInfo, nodesMap } = editorStore;

  const activePanComp = useMemo(() => {
    if (
      !draggingInfo ||
      ![DragOrigin.SORT, DragOrigin.MOVE].includes(draggingInfo.from)
    ) {
      return <></>;
    }
    const { id } = draggingInfo;
    const targetDom = document.getElementById(id);
    if (id && nodesMap[id] && targetDom) {
      const { width, height } = targetDom.getBoundingClientRect();
      return (
        <CompTree
          rootId={id}
          withDnd={false}
          style={{
            height,
            width,
            position: "unset",
          }}
        />
      );
    }
  }, [draggingInfo, nodesMap]);

  return activePanComp;
});

export const PanDragOverlayComp = memo(PanDragOverlayTmpl);
