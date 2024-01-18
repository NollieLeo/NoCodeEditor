import { useCallback } from "react";
import { forEach, indexOf, map, min } from "lodash-es";
import { DragOrigin } from "../types";
import { getFlexLayoutDirection } from "../utils/layout";
import { useGetDragInfo } from "./useGetDragInfo";
import { useGetOverInfo } from "./useGetOverInfo";

function genRectToDistance(pLeft: number, pTop: number, rect: DOMRect) {
  const { left: rLeft, width: rWidth, height: rHeight, top: rTop } = rect;
  const diffX = Math.abs(pLeft - (rLeft + rWidth / 2));
  const diffY = Math.abs(pTop - (rTop + rHeight / 2));
  return Math.sqrt(diffX * diffX + diffY * diffY);
}

export function useGetInsertTarget() {
  const dragInfo = useGetDragInfo();
  const overInfo = useGetOverInfo();

  const getDragCenterRect = useCallback(() => {
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
  }, [dragInfo?.id]);

  const getClosestNodeInfo = useCallback(
    (pLeft: number, pTop: number) => {
      if (!overInfo?.id || !overInfo.accepts?.length) {
        return null;
      }
      const childNodesInfo: { rect: DOMRect; index: number }[] = [];
      forEach(overInfo.accepts, (id, index) => {
        const dom = document.getElementById(id);
        if (!dom) {
          throw new Error(`child id: ${id} not found in dom tree`);
        }
        if (
          dom.style.position !== "absolute" &&
          dom.style.position !== "fixed"
        ) {
          childNodesInfo.push({
            rect: dom.getBoundingClientRect(),
            index,
          });
        }
      });
      const distances = map(childNodesInfo, ({ rect }) =>
        genRectToDistance(pLeft, pTop, rect)
      );

      const minDis = min(distances);
      const idx = indexOf(distances, minDis);
      return childNodesInfo[idx] || null;
    },
    [overInfo?.accepts, overInfo?.id]
  );

  const getInsertInfo = () => {
    if (dragInfo?.from !== DragOrigin.SIDE_ADD || !overInfo) {
      return;
    }
    const centerRect = getDragCenterRect();
    if (!centerRect) {
      return;
    }
    const targetInfo = getClosestNodeInfo(centerRect.left, centerRect.top);
    if (!targetInfo) {
      return;
    }
    const { rect: targetRect, index: targetIdx } = targetInfo;

    const direction = getFlexLayoutDirection(
      document.getElementById(overInfo.id)
    );

    if (direction === "vertical") {
      const { top: dragTop } = centerRect;
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
      const { left: dragLeft } = centerRect;
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
