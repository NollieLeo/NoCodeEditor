import { CSSProperties, FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { CompTree } from "@/components/editor/components/CompTree";
import { useGetDragData } from "@/components/editor/hooks/useGetDragNode";

/**
 * @description 面板内部拖拽元素的时候的overlay
 */
const SortOverlayCompTmpl: FC = observer(() => {
  const {
    editorStore: {
      panState: { scale },
    },
  } = useEditorContext();
  const dragInfo = useGetDragData();

  const dragId = dragInfo?.id;
  const dragOrigin = dragInfo?.from;

  const wrapperStyle: CSSProperties = useMemo(
    () => ({
      transformOrigin: "0 0",
      transform: `scale(${scale})`,
      position: "relative",
      opacity: 0.8,
    }),
    [scale]
  );

  if (!dragId || dragOrigin !== DragOrigin.SORT) {
    return <></>;
  }

  return (
    <div style={wrapperStyle}>
      <CompTree rootId={dragId} withDnd={false} />
    </div>
  );
});

export const SortOverlayComp = memo(SortOverlayCompTmpl);
