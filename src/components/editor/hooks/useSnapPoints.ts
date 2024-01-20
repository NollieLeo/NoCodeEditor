import { forEach, isNil, map, uniq } from "lodash-es";
import { useCallback } from "react";
import { useComponentId } from "./useComponentId";
import { useDom } from "./useDom";

export function useSnapPoints() {
  const { getNodeParentId } = useComponentId();
  const { getSiblingDoms } = useDom();

  const getSiblingRects = useCallback(
    (targetId: string) => {
      const siblingEles = getSiblingDoms(targetId);
      return map(siblingEles, (dom) => {
        return dom.getBoundingClientRect();
      });
    },
    [getSiblingDoms]
  );

  const getParentRect = useCallback(
    (targetId: string) => {
      const parentId = getNodeParentId(targetId);
      if (isNil(parentId)) {
        return null;
      }
      const dom = document.getElementById(parentId);
      if (!dom) {
        return null;
      }
      return dom.getBoundingClientRect();
    },
    [getNodeParentId]
  );

  const getParentSnapPoints = useCallback(
    (targetId: string) => {
      const parentRect = getParentRect(targetId);
      const xPoints: number[] = [];
      const yPoints: number[] = [];
      if (parentRect) {
        const { left, right, top, bottom, width, height } = parentRect;
        xPoints.push(...[left, right, left + width / 2]);
        yPoints.push(...[top, bottom, top + height / 2]);
      }
      return {
        xPoints,
        yPoints,
      };
    },
    [getParentRect]
  );

  const getSiblingSnapPoints = useCallback(
    (targetId: string) => {
      const xPoints: number[] = [];
      const yPoints: number[] = [];
      const siblingRects = getSiblingRects(targetId);
      forEach(siblingRects, ({ left, right, top, bottom }) => {
        xPoints.push(left);
        xPoints.push(right);
        yPoints.push(top);
        yPoints.push(bottom);
      });
      return {
        xPoints,
        yPoints,
      };
    },
    [getSiblingRects]
  );

  const getSnapPoints = useCallback(
    (targetId: string) => {
      const siblingPoints = getSiblingSnapPoints(targetId);
      const parentPoints = getParentSnapPoints(targetId);
      return {
        xPoints: uniq([...siblingPoints.xPoints, ...parentPoints.xPoints]),
        yPoints: uniq([...siblingPoints.yPoints, ...parentPoints.yPoints]),
      };
    },
    [getParentSnapPoints, getSiblingSnapPoints]
  );

  return getSnapPoints;
}
