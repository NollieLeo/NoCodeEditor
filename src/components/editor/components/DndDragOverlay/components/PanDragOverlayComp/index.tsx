import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { useRenderComponentsTree } from "@/components/editor/hooks/useRenderComponentsTree";

const PanDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();
  const { draggingInfo, nodeMap } = editorStore;
  const renderCompTree = useRenderComponentsTree(false);

  const activePanComp = useMemo(() => {
    if (!draggingInfo || draggingInfo.from !== DragOrigin.PAN_SORT) {
      return <></>;
    }
    const { id } = draggingInfo;

    if (id && nodeMap[id]) {
      const targetComp = toJS(nodeMap[id], {
        recurseEverything: true,
      });
      return renderCompTree([targetComp]);
    }
  }, [draggingInfo, nodeMap, renderCompTree]);

  return activePanComp;
});

export const PanDragOverlayComp = memo(PanDragOverlayTmpl);
