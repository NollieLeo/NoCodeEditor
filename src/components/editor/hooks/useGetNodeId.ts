import { useCallback } from "react";
import { useGetNodeInfo } from "./useGetNodeInfo";
import { filter, isNil } from "lodash-es";

export const useGetNodeId = () => {
  const { getNodeInfo, getNodeParentInfo } = useGetNodeInfo();

  const getNodeParentId = useCallback(
    (targetId: string) => {
      const { parentId } = getNodeInfo(targetId);
      return parentId;
    },
    [getNodeInfo]
  );

  const getSiblingIds = useCallback(
    (targetId: string) => {
      const parentInfo = getNodeParentInfo(targetId);
      if (isNil(parentInfo)) {
        return [];
      }
      return filter(parentInfo.childNodes, (id) => id !== targetId);
    },
    [getNodeParentInfo]
  );

  return {
    getNodeParentId,
    getSiblingIds,
  };
};
