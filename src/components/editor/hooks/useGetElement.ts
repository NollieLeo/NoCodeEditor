import { useCallback } from "react";
import { useGetNodeInfo } from "./useGetNodeInfo";
import { useGetNodeId } from "./useGetNodeId";
import { isNil, map } from "lodash-es";

export const useGetElement = () => {
  const { getNodeInfo, getNodeParentInfo } = useGetNodeInfo();
  const { getSiblingIds } = useGetNodeId();

  // TODO(wkm) 获取真实dom的方法不仅限于id，后续可能会带更多标识
  const getElement = useCallback(
    (targetId: string) => {
      const { id } = getNodeInfo(targetId);
      const ele = document.getElementById(id);
      if (isNil(ele)) {
        throw new Error(`element: ${targetId} does not exist`);
      }
      return ele;
    },
    [getNodeInfo]
  );

  const getParentElement = useCallback(
    (targetId: string) => {
      const parentInfo = getNodeParentInfo(targetId);
      if (isNil(parentInfo)) {
        return null;
      }
      return getElement(parentInfo.id);
    },
    [getElement, getNodeParentInfo]
  );

  const getSiblingElements = useCallback(
    (targetId: string) => {
      const siblingIds = getSiblingIds(targetId);
      if (isNil(siblingIds)) {
        return null;
      }
      return map(siblingIds, getElement);
    },
    [getElement, getSiblingIds]
  );

  const getChildElements = useCallback(
    (targetId: string) => {
      const { childNodes } = getNodeInfo(targetId);
      if (isNil(childNodes)) {
        return null;
      }
      return map(childNodes, getElement);
    },
    [getElement, getNodeInfo]
  );

  return {
    getElement,
    getParentElement,
    getSiblingElements,
    getChildElements,
  };
};
