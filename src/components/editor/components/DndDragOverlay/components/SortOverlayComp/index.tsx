import { CSSProperties, FC, memo, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";
import { CompTree } from "@/components/editor/components/CompTree";

/**
 * @description 面板内部拖拽元素的时候的overlay
 */
const SortOverlayCompTmpl: FC = observer(() => {
  const { editorStore } = useEditorContext();
  const {
    draggingInfo,
    panState: { scale },
  } = editorStore;

  const dragId = draggingInfo?.id;
  const dragOrigin = draggingInfo?.from;

  const wrapperStyle: CSSProperties = useMemo(
    () => ({
      transform: `scale(${scale})`,
      position: "relative",
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
