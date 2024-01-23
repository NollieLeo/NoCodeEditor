import { useCallback } from "react";
import { useGetComponentInfo } from "./useGetComponentInfo";
import { useGetComponentId } from "./useGetComponentId";
import { isNil, map } from "lodash-es";
import { getDomById } from "../utils/Dom";

export const useDom = () => {
  const { getComponentInfo, getCompentParentInfo } = useGetComponentInfo();
  const { getSiblingIds } = useGetComponentId();

  // TODO(wkm) 获取真实dom的方法不仅限于id，后续可能会带更多标识
  const getDom = useCallback(
    (targetId: string) => {
      const { id } = getComponentInfo(targetId);
      const ele = getDomById(id);
      if (isNil(ele)) {
        throw new Error(`element: ${targetId} does not exist`);
      }
      return ele;
    },
    [getComponentInfo]
  );

  const getParentDom = useCallback(
    (targetId: string) => {
      const parentInfo = getCompentParentInfo(targetId);
      if (isNil(parentInfo)) {
        return null;
      }
      return getDom(parentInfo.id);
    },
    [getDom, getCompentParentInfo]
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
