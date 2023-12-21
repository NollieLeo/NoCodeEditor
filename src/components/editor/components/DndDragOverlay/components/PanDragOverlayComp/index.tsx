import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";

const PanDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();

  const activePanComp = useMemo(() => {
    if (
      !editorStore.draggingNode ||
      editorStore.draggingNode.from !== DragOrigin.PAN
    ) {
      return <></>;
    }
    const { componentId } = editorStore.draggingNode;
    if (componentId && editorStore.nodeMap[componentId]) {
      const { type } = toJS(editorStore.nodeMap[componentId]);
      const { name } = COMPONENTS_INFO[type];
      return <span>{name}</span>;
    }
  }, [editorStore.draggingNode, editorStore.nodeMap]);

  return activePanComp;
});

export const PanDragOverlayComp = memo(PanDragOverlayTmpl);
