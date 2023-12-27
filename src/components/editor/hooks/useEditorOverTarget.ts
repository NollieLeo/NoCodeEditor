import { useCallback, useEffect, useMemo, useState } from "react";
import { useEditorContext } from "./useEditorContext";
import { indexOf, map, min } from "lodash-es";
import { DragOrigin } from "../types";

function pointRectDist(pLeft: number, pTop: number, rect: DOMRect) {
  const { left: rLeft, width: rWidth, height: rHeight, top: rTop } = rect;
  //   const cx = Math.max(Math.min(pLeft, rLeft + rWidth), rLeft);
  //   const cy = Math.max(Math.min(pTop, rTop + rHeight), rTop);
  //   const diffX = Math.abs(pLeft - cx);
  //   const diffY = Math.abs(pTop - cy);
  const diffX = Math.abs(pLeft - (rLeft + rWidth / 2));
  const diffY = Math.abs(pTop - (rTop + rHeight / 2));

  return Math.sqrt(diffX * diffX + diffY * diffY);
}

export function useEditorOverTarget() {
  const {
    editorStore: { overInfo, draggingInfo },
  } = useEditorContext();

  const [insertIdx, setInsertIdx] = useState<number>(0);
  const [insertRect, setInsertRect] = useState<DOMRect | null>();

  const childRects = useMemo(() => {
    if (!overInfo?.id || !overInfo.accepts?.length) {
      return null;
    }
    return map(overInfo.accepts, (id) => {
      const dom = document.getElementById(id);
      if (!dom) {
        throw new Error(`child id: ${id} not found in dom tree`);
      }
      return dom.getBoundingClientRect();
    });
  }, [overInfo?.id]);

  const getDragRect = useCallback(() => {
    if (!draggingInfo) {
      return null;
    }
    const { id } = draggingInfo;
    const draggingDom = document.getElementById(id);
    if (!draggingDom) {
      return null;
    }
    const { top, height, width, left } = draggingDom.getBoundingClientRect();
    return {
      top: top + height / 2,
      left: left + width / 2,
    };
  }, [draggingInfo]);

  const getClosestDomInfo = useCallback(
    (pLeft: number, pTop: number): [DOMRect, number] | null => {
      if (!childRects) {
        return null;
      }
      const distances = map(childRects, (rect) =>
        pointRectDist(pLeft, pTop, rect)
      );
      const minDis = min(distances);
      const idx = indexOf(distances, minDis);
      return childRects[idx] ? [childRects[idx], idx] : null;
    },
    [childRects]
  );

  useEffect(() => {
    if (
      draggingInfo?.from !== DragOrigin.SIDE_ADD ||
      !overInfo ||
      !overInfo.rect
    ) {
      setInsertIdx(0);
      setInsertRect(null);
      return;
    }
    const dragRect = getDragRect();
    if (!dragRect) {
      return;
    }
    const targetInfo = getClosestDomInfo(dragRect.left, dragRect.top);
    if (!targetInfo) {
      return;
    }
    const [targetRect, targetIdx] = targetInfo;
    if (targetIdx === -1) {
      return;
    }
    const { top: dragTop } = dragRect;
    const {
      top: targetTop,
      height: targetHeight,
      left: targetLeft,
      width: targetWidth,
    } = targetRect;

    const targetCenterTop = targetTop + targetHeight / 2;

    const insertIdx = dragTop > targetCenterTop ? targetIdx + 1 : targetIdx;
    const insertRect = {
      ...targetRect,
      left: targetLeft + targetWidth / 2,
      top: dragTop > targetCenterTop ? targetTop + targetHeight : targetTop,
    };
    setInsertIdx(insertIdx);
    setInsertRect(insertRect);
  }, [draggingInfo, getClosestDomInfo, getDragRect, overInfo]);

  return [insertIdx, insertRect] as const;
}
