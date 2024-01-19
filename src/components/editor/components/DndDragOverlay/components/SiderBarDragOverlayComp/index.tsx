import { FC, memo, useMemo } from "react";
import { DragOrigin } from "@/components/editor/types";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useGetDragInfo } from "@/components/editor/hooks/useGetDragInfo";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";

/**
 * 从侧边栏拖拽的时候的overlay
 */
const SiderBarDragOverlayTmpl: FC = observer(() => {
  const dragInfo = useGetDragInfo();
  const {
    editorStore: { zoom },
  } = useEditorContext();

  const activeSiderBarComp = useMemo(() => {
    if (!dragInfo || dragInfo.from !== DragOrigin.SIDE_ADD) {
      return <></>;
    }
    const { type, id } = dragInfo;
    if (type) {
      const { render: Component, defaultData } = COMPONENTS_INFO[type];
      return (
        <Component
          {...defaultData}
          style={{
            ...defaultData.style,
            transform: `scale(${zoom})`,
          }}
          id={id}
        />
      );
    }
  }, [dragInfo, zoom]);

  return activeSiderBarComp;
});

export const SiderBarDragOverlayComp = memo(SiderBarDragOverlayTmpl);
