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
  const { draggingInfo, panState } = editorStore;

  const dragId = draggingInfo?.id;
  const dragOrigin = draggingInfo?.from;
  const panScale = panState?.scale || 1;

  const wrapperStyle: CSSProperties = useMemo(
    () => ({
      transform: `scale(${panScale})`,
      position: "relative",
    }),
    [panScale]
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
