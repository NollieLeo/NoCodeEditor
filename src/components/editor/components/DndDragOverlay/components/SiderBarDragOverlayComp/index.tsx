import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { DragOrigin } from "@/components/editor/types";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";

const SiderBarDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();

  const activeSiderBarComp = useMemo(() => {
    if (
      !editorStore.draggingNode ||
      editorStore.draggingNode.from !== DragOrigin.SIDE_ADD
    ) {
      return <></>;
    }
    const { componentType } = editorStore.draggingNode;
    if (componentType) {
      const { render: Component, defaultData } = COMPONENTS_INFO[componentType];
      return <Component {...defaultData} />;
    }
  }, [editorStore.draggingNode]);

  return activeSiderBarComp;
});

export const SiderBarDragOverlayComp = memo(SiderBarDragOverlayTmpl);
