import { forEach, isNil, map, uniq } from "lodash-es";
import { useCallback } from "react";
import { useGetNodeId } from "./useGetNodeId";
import { useGetElement } from "./useGetElement";

export function useSnapPoints() {
  const { getNodeParentId } = useGetNodeId();
  const { getSiblingElements } = useGetElement();

  const getSiblingRects = useCallback(
    (targetId: string) => {
      const siblingEles = getSiblingElements(targetId);
      return map(siblingEles, (dom) => {
        return dom.getBoundingClientRect();
      });
    },
    [getSiblingElements]
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
        xPoints: uniq(xPoints),
        yPoints: uniq(yPoints),
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
        xPoints: uniq(xPoints),
        yPoints: uniq(yPoints),
      };
    },
    [getSiblingRects]
  );

  const getSnapPoints = useCallback(
    (targetId: string) => {
      const siblingPoints = getSiblingSnapPoints(targetId);
      const parentPoints = getParentSnapPoints(targetId);
      return {
        xPoints: [...siblingPoints.xPoints, ...parentPoints.xPoints],
        yPoints: [...siblingPoints.yPoints, ...parentPoints.yPoints],
      };
    },
    [getParentSnapPoints, getSiblingSnapPoints]
  );

  return getSnapPoints;
}
