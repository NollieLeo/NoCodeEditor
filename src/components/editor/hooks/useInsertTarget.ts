import { useCallback, useMemo } from "react";
import { forEach, indexOf, isNil, map, min } from "lodash-es";
import { DragOrigin } from "../types";
import { getFlexLayoutDirection, isAbsoluteOrFixed } from "../utils/layout";
import { useDragInfo } from "./useDragInfo";
import { useDragOverInfo } from "./useDragOverInfo";
import { useGetComponentInfo } from "./useGetComponentInfo";
import { useEditorContext } from "./useEditorContext";
import { getDomById, getDomByOverlayId } from "../utils/Dom";

function genRectToDistance(pLeft: number, pTop: number, rect: DOMRect) {
  const { left: rLeft, width: rWidth, height: rHeight, top: rTop } = rect;
  const diffX = Math.abs(pLeft - (rLeft + rWidth / 2));
  const diffY = Math.abs(pTop - (rTop + rHeight / 2));
  return Math.sqrt(diffX * diffX + diffY * diffY);
}

export function useInsertTarget() {
  const {
    editorStore: { positonMode },
  } = useEditorContext();

  const dragInfo = useDragInfo();
  const overInfo = useDragOverInfo();

  const { getComponentInfo } = useGetComponentInfo();

  const overCompChildInfo = useMemo(() => {
    if (!overInfo?.id) {
      return null;
    }
    const overNodeSchema = getComponentInfo(overInfo.id);
    const childNodesInfo: { rect: DOMRect; index: number }[] = [];
    forEach(overNodeSchema.childsId, (id, index) => {
      const dom = getDomById(id);
      const isLegalDom =
        dom?.checkVisibility() && !isAbsoluteOrFixed(dom.style);
      if (isLegalDom) {
        childNodesInfo.push({
          rect: dom!.getBoundingClientRect(),
          index,
        });
      }
    });
    return childNodesInfo;
  }, [getComponentInfo, overInfo?.id]);

  const insertable = useMemo(() => {
    if (!dragInfo || !overInfo || dragInfo?.from !== DragOrigin.SIDE_ADD) {
      return false;
    }
    if (isAbsoluteOrFixed({ position: positonMode })) {
      return false;
    }
    return true;
  }, [dragInfo, overInfo, positonMode]);

  const direction = useMemo(() => {
    if (isNil(overInfo)) {
      return null;
    }
    return getFlexLayoutDirection(getDomById(overInfo.id));
  }, [overInfo]);

  const getDragCenterRect = useCallback(() => {
    if (isNil(dragInfo)) {
      return;
    }
    const dom = getDomByOverlayId(dragInfo.id);
    if (isNil(dom)) {
      return null;
    }
    const { top, height, width, left } = dom.getBoundingClientRect();
    return {
      top: top + height / 2,
      left: left + width / 2,
    };
  }, [dragInfo]);

  const getClosestCompInfo = useCallback(
    (pLeft: number, pTop: number) => {
      if (isNil(overCompChildInfo) || !overCompChildInfo.length) {
        return null;
      }
      const distances = map(overCompChildInfo, ({ rect }) =>
        genRectToDistance(pLeft, pTop, rect)
      );
      const minDis = min(distances);
      const idx = indexOf(distances, minDis);
      return overCompChildInfo[idx] || null;
    },
    [overCompChildInfo]
  );

  const getInsertInfo = useCallback(() => {
    const dragCenter = getDragCenterRect();
    if (isNil(insertable) || isNil(dragCenter)) {
      return;
    }
    const insetTargetInfo = getClosestCompInfo(dragCenter.left, dragCenter.top);
    if (isNil(insetTargetInfo)) {
      return;
    }
    const { left: centerLeft, top: centerTop } = dragCenter;

    const { rect, index } = insetTargetInfo;
    const { top, height, left, width, bottom, right } = rect;

    const targetCenterTop = top + height / 2;
    const targetCenterLeft = left + width / 2;

    const insertRect = { ...rect };
    let insertIdx = index;

    if (direction === "vertical") {
      insertRect.left = targetCenterLeft;
      insertRect.top = top;
      if (centerTop > targetCenterTop) {
        insertRect.top = bottom;
        insertIdx = index + 1;
      }
    } else if (direction === "horizontal") {
      insertRect.top = targetCenterTop;
      insertRect.left = left;
      if (centerLeft > targetCenterLeft) {
        insertRect.left = right;
        insertIdx = index + 1;
      }
    }

    return {
      insertIdx,
      direction,
      insertRect,
    };
  }, [direction, getClosestCompInfo, getDragCenterRect, insertable]);

  return getInsertInfo;
}
