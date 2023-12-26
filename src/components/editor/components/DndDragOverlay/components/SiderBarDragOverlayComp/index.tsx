import { FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { DragOrigin } from "@/components/editor/types";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";

/**
 * 从侧边栏拖拽的时候的overlay
 */
const SiderBarDragOverlayTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();

  const { draggingInfo } = editorStore;

  const activeSiderBarComp = useMemo(() => {
    if (
      !draggingInfo ||
      draggingInfo.from !== DragOrigin.SIDE_ADD
    ) {
      return <></>;
    }
    const { type, id } = draggingInfo;
    if (type) {
      const { render: Component, defaultData } = COMPONENTS_INFO[type];
      return <Component {...defaultData} id={id} />;
    }
  }, [draggingInfo]);

  return activeSiderBarComp;
});

export const SiderBarDragOverlayComp = memo(SiderBarDragOverlayTmpl);
