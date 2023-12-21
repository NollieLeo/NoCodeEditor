import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { useRenderComponentsTree } from "@/components/editor/hooks/useRenderComponentsTree";

const PanDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();
  const renderCompTree = useRenderComponentsTree(false);

  const activePanComp = useMemo(() => {
    if (
      !editorStore.draggingNode ||
      editorStore.draggingNode.from !== DragOrigin.PAN
    ) {
      return <></>;
    }
    const { componentId } = editorStore.draggingNode;
    if (componentId && editorStore.nodeMap[componentId]) {
      const targetComp = toJS(editorStore.nodeMap[componentId], {
        recurseEverything: true,
      });
      return <div>{renderCompTree([targetComp])}</div>;
    }
  }, [editorStore.draggingNode, editorStore.nodeMap]);

  return activePanComp;
});

export const PanDragOverlayComp = memo(PanDragOverlayTmpl);
