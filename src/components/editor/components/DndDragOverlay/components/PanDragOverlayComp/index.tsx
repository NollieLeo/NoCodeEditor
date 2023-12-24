import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
// import { useRenderComponentsTree } from "@/components/editor/hooks/useRenderComponentsTree";

const PanDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();
  // const renderCompTree = useRenderComponentsTree(false);

  const activePanComp = useMemo(() => {
    if (
      !editorStore.draggingInfo ||
      editorStore.draggingInfo.from !== DragOrigin.PAN_SORT
    ) {
      return <></>;
    }
    const { id } = editorStore.draggingInfo;
    if (id && editorStore.nodeMap[id]) {
      const targetComp = toJS(editorStore.nodeMap[id], {
        recurseEverything: true,
      });
      return <span>{targetComp.type}</span>;
      // return <div>{renderCompTree([targetComp])}</div>;
    }
  }, [editorStore.draggingInfo, editorStore.nodeMap]);

  return activePanComp;
});

export const PanDragOverlayComp = memo(PanDragOverlayTmpl);
