import { FC, memo, useMemo } from "react";
import { DragOrigin } from "@/components/editor/types";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useGetDragData } from "@/components/editor/hooks/useGetDragNode";

/**
 * 从侧边栏拖拽的时候的overlay
 */
const SiderBarDragOverlayTmpl: FC = () => {
  const dragInfo = useGetDragData();

  const activeSiderBarComp = useMemo(() => {
    if (!dragInfo || dragInfo.from !== DragOrigin.SIDE_ADD) {
      return <></>;
    }
    const { type, id } = dragInfo;
    if (type) {
      const { render: Component, defaultData } = COMPONENTS_INFO[type];
      return <Component {...defaultData} id={id} />;
    }
  }, [dragInfo]);

  return activeSiderBarComp;
};

export const SiderBarDragOverlayComp = memo(SiderBarDragOverlayTmpl);
