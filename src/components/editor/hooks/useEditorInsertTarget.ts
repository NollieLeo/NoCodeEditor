import { useCallback } from "react";
import { indexOf, map, min } from "lodash-es";
import { DragOrigin } from "../types";
import { getFlexLayoutDirection } from "../utils/layout";
import { useGetDragData } from "./useGetDragNode";
import { useGetOverNode } from "./useGetOverNode";

function pointRectDist(pLeft: number, pTop: number, rect: DOMRect) {
  const { left: rLeft, width: rWidth, height: rHeight, top: rTop } = rect;
  const diffX = Math.abs(pLeft - (rLeft + rWidth / 2));
  const diffY = Math.abs(pTop - (rTop + rHeight / 2));
  return Math.sqrt(diffX * diffX + diffY * diffY);
}

export function useEditorInsertTarget() {
  const dragInfo = useGetDragData();
  const overInfo = useGetOverNode();

  const getChildRects = useCallback(() => {
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
  }, [overInfo?.accepts, overInfo?.id]);

  const getDragRect = useCallback(() => {
    if (!dragInfo) {
      return null;
    }
    const { id } = dragInfo;
    const draggingDom = document.getElementById(id);
    if (!draggingDom) {
      return null;
    }
    const { top, height, width, left } = draggingDom.getBoundingClientRect();
    return {
      top: top + height / 2,
      left: left + width / 2,
    };
  }, [dragInfo]);

  const getClosestDomInfo = useCallback(
    (pLeft: number, pTop: number): [DOMRect, number] | null => {
      const childRects = getChildRects();
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
    [getChildRects]
  );

  const getInsertInfo = () => {
    if (dragInfo?.from !== DragOrigin.SIDE_ADD || !overInfo) {
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

    const direction = getFlexLayoutDirection(
      document.getElementById(overInfo.id)
    );

    if (direction === "vertical") {
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
      return {
        insertIdx,
        insertRect,
        direction,
      };
    } else if (direction === "horizontal") {
      const { left: dragLeft } = dragRect;
      const {
        top: targetTop,
        height: targetHeight,
        left: targetLeft,
        width: targetWidth,
      } = targetRect;

      const targetCenterLeft = targetLeft + targetWidth / 2;

      const insertIdx = dragLeft > targetCenterLeft ? targetIdx + 1 : targetIdx;
      const insertRect = {
        ...targetRect,
        top: targetTop + targetHeight / 2,
        left:
          dragLeft > targetCenterLeft ? targetLeft + targetWidth : targetLeft,
      };
      return {
        insertIdx,
        insertRect,
        direction,
      };
    }
  };

  return getInsertInfo;
}
