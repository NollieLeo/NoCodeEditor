import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { ComponentInfo, DragOrigin } from "@/components/editor/types";
import { isNil } from "lodash-es";
import { observer } from "mobx-react-lite";
import { memo, useMemo } from "react";
import { DraggingGuildLines } from "./components/DraggingGuildLines";
import { ParentSnapLines } from "./components/ParentSnapLines";
import { SiblingsSnapLines } from "./components/SiblingsSnapLines";
import { useDragInfo } from "@/components/editor/hooks/useDragInfo";
import { isAbsoluteOrFixed } from "@/components/editor/utils/layout";
import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";

import "./index.scss";
import { useDom } from "@/components/editor/hooks/useDom";

const SnapToolsCompTmpl = observer(() => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const dragInfo = useDragInfo();
  const { getComponentInfo } = useGetComponentInfo();
  const { getDom } = useDom();

  const compInfoWithParent = useMemo(() => {
    const targetId = dragInfo?.id || focusedInfo?.id;
    if (isNil(targetId) || dragInfo?.from !== DragOrigin.MOVE) {
      return null;
    }
    const target = getComponentInfo(targetId);
    if (isNil(target?.parentId) || !isAbsoluteOrFixed(target.attrs.style)) {
      return null;
    }
    return target as { parentId: string } & ComponentInfo;
  }, [dragInfo?.from, dragInfo?.id, focusedInfo?.id, getComponentInfo]);

  if (!compInfoWithParent || isNil(dragInfo)) {
    return <></>;
  }

  const { parentId, id } = compInfoWithParent;

  const parentRect = getDom(parentId).getBoundingClientRect();
  const curRect = getDom(id).getBoundingClientRect();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="collision-lines"
    >
      <DraggingGuildLines dragRect={curRect} parentRect={parentRect} />
      {!!dragInfo && (
        <ParentSnapLines dragRect={curRect} parentRect={parentRect} />
      )}
      {!!dragInfo && (
        <SiblingsSnapLines
          rect={curRect}
          parentRect={parentRect}
          id={id}
        />
      )}
    </svg>
  );
});

export const SnapTools = memo(SnapToolsCompTmpl);
