import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { DragOrigin } from "@/components/editor/types";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";

const SiderBarDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();

  const activeSiderBarComp = useMemo(() => {
    if (
      !editorStore.draggingInfo ||
      editorStore.draggingInfo.from !== DragOrigin.SIDE_ADD
    ) {
      return <></>;
    }
    const { type } = editorStore.draggingInfo;
    if (type) {
      const { render: Component, defaultData } = COMPONENTS_INFO[type];
      return <Component {...defaultData} />;
    }
  }, [editorStore.draggingInfo]);

  return activeSiderBarComp;
});

export const SiderBarDragOverlayComp = memo(SiderBarDragOverlayTmpl);
