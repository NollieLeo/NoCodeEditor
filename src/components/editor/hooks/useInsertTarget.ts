import { useCallback } from "react";
import { forEach, indexOf, isNil, map, min } from "lodash-es";
import { DragOrigin } from "../types";
import { getFlexLayoutDirection, isAbsoluteOrFixed } from "../utils/layout";
import { useDragInfo } from "./useDragInfo";
import { useDragOverInfo } from "./useDragOverInfo";
import { useDndContext } from "@dnd-kit/core";
import { useGetComponentInfo } from "./useGetComponentInfo";
import { useEditorContext } from "./useEditorContext";
import { getDomById } from "../utils/Dom";

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
  const { active } = useDndContext();
  const { getComponentInfo } = useGetComponentInfo();

  const getDragCenterRect = useCallback(() => {
    if (!active?.rect.current.translated) {
      return null;
    }
    const { top, height, width, left } = active.rect.current.translated;
    return {
      top: top + height / 2,
      left: left + width / 2,
    };
  }, [active?.rect.current.translated]);

  const getClosestNodeInfo = useCallback(
    (pLeft: number, pTop: number) => {
      if (!overInfo?.id) {
        return null;
      }
      const overNodeSchema = getComponentInfo(overInfo.id);
      const childNodesInfo: { rect: DOMRect; index: number }[] = [];
      forEach(overNodeSchema.childsId, (id, index) => {
        const dom = getDomById(id);
        if (dom?.checkVisibility() && !isAbsoluteOrFixed(dom.style)) {
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
    [getComponentInfo, overInfo?.id]
  );

  const checkIsInsertable = () => {
    if (dragInfo?.from !== DragOrigin.SIDE_ADD || !overInfo) {
      return false;
    }

    if (isAbsoluteOrFixed({ position: positonMode })) {
      return false;
    }
    return true;
  };

  const getInsertInfo = () => {
    if (!checkIsInsertable()) {
      return;
    }

    const centerRect = getDragCenterRect();
    if (isNil(centerRect)) {
      return;
    }
    const insetTargetInfo = getClosestNodeInfo(centerRect.left, centerRect.top);
    if (isNil(insetTargetInfo)) {
      return;
    }
    const { rect: insertTarget, index: targetIdx } = insetTargetInfo;
    const {
      top: insertTop,
      height: insertHeight,
      left: insertLeft,
      width: insertWdith,
      bottom: inertBottom,
      right: insertRight,
    } = insertTarget;

    const { left: centerLeft, top: centerTop } = centerRect;
    const targetCenterTop = insertTop + insertHeight / 2;
    const targetCenterLeft = insertLeft + insertWdith / 2;

    const direction = getFlexLayoutDirection(getDomById(overInfo!.id));

    if (direction === "vertical") {
      const isNearTop = centerTop > targetCenterTop;
      const insertRect = {
        ...insertTarget,
        left: targetCenterLeft,
        top: isNearTop ? inertBottom : insertTop,
      };
      return {
        insertIdx: isNearTop ? targetIdx + 1 : targetIdx,
        insertRect,
        direction,
      };
    } else if (direction === "horizontal") {
      const isNearLeft = centerLeft > targetCenterLeft;
      const insertRect = {
        ...insertTarget,
        top: targetCenterTop,
        left: isNearLeft ? insertRight : insertLeft,
      };
      return {
        insertIdx: isNearLeft ? targetIdx + 1 : targetIdx,
        insertRect,
        direction,
      };
    }
  };

  return getInsertInfo;
}
