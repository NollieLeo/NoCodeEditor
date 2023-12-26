import { useEffect, useState } from "react";
import { useEditorContext } from "./useEditorContext";
import { findIndex, map, times } from "lodash-es";
import { DragOrigin } from "../types";

export function useEditorOverTarget() {
  const {
    editorStore: { overInfo, draggingInfo },
  } = useEditorContext();

  const [targetIdx, setTargetIdx] = useState<number>(0);
  const [targetTop, setTargetTop] = useState<number>(0);

  useEffect(() => {
    if (
      !overInfo ||
      !overInfo.accepts?.length ||
      !overInfo.rect ||
      !draggingInfo ||
      draggingInfo?.from !== DragOrigin.SIDE_ADD
    ) {
      setTargetIdx(0);
      setTargetTop(0);
      return;
    }
    const { accepts, rect: overRect } = overInfo;
    const { id: dragId } = draggingInfo;
    const dragRect = document.getElementById(dragId)?.getBoundingClientRect();
    const childRects = map(overInfo.accepts, (id) =>
      document.getElementById(id)?.getBoundingClientRect()
    ) as DOMRect[];
    if (!dragRect) {
      return;
    }
    const dragTop = dragRect?.top + dragRect?.height / 2 || 0;

    const sections: Array<[number, number]> = times(
      accepts.length + 1,
      (idx) => {
        const preIdx = idx - 1;
        if (preIdx < 0) {
          const childRect = childRects[idx];
          return [overRect.top, childRect.top + childRect.height / 2];
        }
        if (idx >= (accepts.length || 0)) {
          const preChildRect = childRects[preIdx];
          return [
            preChildRect.top + preChildRect.height / 2 + 1,
            overRect.top + overRect.height,
          ];
        }
        const preChildRect = childRects[preIdx];
        const curChildRect = childRects[idx];
        return [
          preChildRect.top + preChildRect.height / 2 + 1,
          curChildRect.top + curChildRect.height / 2,
        ];
      }
    );

    const targetIdx = findIndex(
      sections,
      ([left, right]) => dragTop >= left && dragTop <= right
    );
    if (targetIdx > -1) {
      setTargetIdx(targetIdx);
      if (targetIdx === 0) {
        setTargetTop((childRects[0].top - overRect.top) / 2 + overRect.top);
      } else if (targetIdx === sections.length - 1) {
        setTargetTop(childRects[targetIdx - 1].bottom + 10);
      } else {
        const diff =
          childRects[targetIdx]?.top - childRects[targetIdx - 1]?.bottom;
        setTargetTop(diff / 2 + childRects[targetIdx - 1]?.bottom);
      }
    }
  }, [draggingInfo, overInfo]);

  return [targetIdx, targetTop] as const;
}
