import { useCallback } from "react";
import { useComponentInfo } from "./useComponentInfo";
import { useComponentId } from "./useComponentId";
import { isNil, map } from "lodash-es";

export const useDom = () => {
  const { getComponentInfo, getNodeParentInfo } = useComponentInfo();
  const { getSiblingIds } = useComponentId();

  // TODO(wkm) 获取真实dom的方法不仅限于id，后续可能会带更多标识
  const getDom = useCallback(
    (targetId: string) => {
      const { id } = getComponentInfo(targetId);
      const ele = document.getElementById(id);
      if (isNil(ele)) {
        throw new Error(`element: ${targetId} does not exist`);
      }
      return ele;
    },
    [getComponentInfo]
  );

  const getParentDom = useCallback(
    (targetId: string) => {
      const parentInfo = getNodeParentInfo(targetId);
      if (isNil(parentInfo)) {
        return null;
      }
      return getDom(parentInfo.id);
    },
    [getDom, getNodeParentInfo]
  );

  const getSiblingDoms = useCallback(
    (targetId: string) => {
      const siblingIds = getSiblingIds(targetId);
      if (isNil(siblingIds)) {
        return null;
      }
      return map(siblingIds, getDom);
    },
    [getDom, getSiblingIds]
  );

  const getChildDoms = useCallback(
    (targetId: string) => {
      const { childsId } = getComponentInfo(targetId);
      if (isNil(childsId)) {
        return null;
      }
      return map(childsId, getDom);
    },
    [getDom, getComponentInfo]
  );

  return {
    getDom,
    getParentDom,
    getSiblingDoms,
    getChildDoms,
  };
};
