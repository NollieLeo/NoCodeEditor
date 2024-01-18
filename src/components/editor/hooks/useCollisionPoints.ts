import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { filter, forEach, map } from "lodash-es";
import { useCallback } from "react";

export function useCollisionPoints() {
  const {
    editorStore: { nodesMap },
  } = useEditorContext();

  const getSiblingIds = useCallback(
    (targetId: string) => {
      const target = nodesMap[targetId];
      if (!target || !target.parentId) {
        return [];
      }
      const { childNodes } = nodesMap[target.parentId];
      return filter(childNodes, (childId) => childId !== targetId);
    },
    [nodesMap]
  );

  const getSiblingRects = useCallback(
    (targetId: string) => {
      const siblingIds = getSiblingIds(targetId);
      return map(siblingIds, (id) => {
        const dom = document.getElementById(id);
        if (!dom) {
          throw new Error(`target dom :${id} does not exist`);
        }
        return dom.getBoundingClientRect();
      });
    },
    [getSiblingIds]
  );

  const getParentRect = useCallback(
    (targetId: string) => {
      const target = nodesMap[targetId];
      if (!target || !target.parentId) {
        return null;
      }
      const dom = document.getElementById(target.parentId);
      if (!dom) {
        return null;
      }
      return dom.getBoundingClientRect();
    },
    [nodesMap]
  );

  const getParentCollisionPoints = useCallback(
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

  const getSiblingCollisionPoints = useCallback(
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

  const getCollisionPoints = useCallback(
    (targetId: string) => {
      const siblingPoints = getSiblingCollisionPoints(targetId);
      const parentPoints = getParentCollisionPoints(targetId);
      return {
        xPoints: [...siblingPoints.xPoints, ...parentPoints.xPoints],
        yPoints: [...siblingPoints.yPoints, ...parentPoints.yPoints],
      };
    },
    [getParentCollisionPoints, getSiblingCollisionPoints]
  );

  return getCollisionPoints;
}
