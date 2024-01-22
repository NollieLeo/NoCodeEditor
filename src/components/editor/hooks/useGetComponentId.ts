import { useCallback } from "react";
import { useGetComponentInfo } from "./useGetComponentInfo";
import { filter, isNil } from "lodash-es";

export const useGetComponentId = () => {
  const { getComponentInfo, getNodeParentInfo } = useGetComponentInfo();

  const getParentComponentId = useCallback(
    (targetId: string) => {
      const { parentId } = getComponentInfo(targetId);
      return parentId;
    },
    [getComponentInfo]
  );

  const getSiblingIds = useCallback(
    (targetId: string) => {
      const parentInfo = getNodeParentInfo(targetId);
      if (isNil(parentInfo)) {
        return [];
      }
      return filter(parentInfo.childsId, (id) => id !== targetId);
    },
    [getNodeParentInfo]
  );

  return {
    getParentComponentId,
    getSiblingIds,
  };
};
