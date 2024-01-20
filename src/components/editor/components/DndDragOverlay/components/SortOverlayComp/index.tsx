import { CSSProperties, FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { CompTree } from "@/components/editor/components/CompTree";
import { useDragInfo } from "@/components/editor/hooks/useDragInfo";

/**
 * @description 面板内部拖拽元素的时候的overlay
 */
const SortOverlayCompTmpl: FC = observer(() => {
  const {
    editorStore: { zoom },
  } = useEditorContext();
  const dragInfo = useDragInfo();

  const dragId = dragInfo?.id;
  const dragOrigin = dragInfo?.from;

  const wrapperStyle: CSSProperties = useMemo(
    () => ({
      transformOrigin: "0 0",
      transform: `scale(${zoom})`,
      position: "relative",
      opacity: 0.8,
    }),
    [zoom]
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
