import { FC, memo, useMemo } from "react";
import { DragOrigin } from "@/components/editor/types";
import {
  COMPONENTS_INFO,
  DATA_COMPONENT_OVERLAY_ID,
} from "@/components/editor/constants";
import { useDragInfo } from "@/components/editor/hooks/useDragInfo";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";

/**
 * 从侧边栏拖拽的时候的overlay
 */
const SiderBarDragOverlayTmpl: FC = observer(() => {
  const dragInfo = useDragInfo();
  const {
    editorStore: { zoom },
  } = useEditorContext();

  const activeSiderBarComp = useMemo(() => {
    if (!dragInfo || dragInfo.from !== DragOrigin.SIDE_ADD) {
      return <></>;
    }
    const { type, id } = dragInfo;
    if (type) {
      const { render: Component, attrs } = COMPONENTS_INFO[type];
      return (
        <Component
          {...attrs}
          style={{
            ...attrs.style,
            opacity: 0.8,
            transform: `scale(${zoom})`,
          }}
          id={id}
          {...{ [DATA_COMPONENT_OVERLAY_ID]: id }}
        />
      );
    }
  }, [dragInfo, zoom]);

  return activeSiderBarComp;
});

export const SiderBarDragOverlayComp = memo(SiderBarDragOverlayTmpl);
