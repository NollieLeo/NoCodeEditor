import { useCallback } from "react";
import { useGetComponentInfo } from "./useGetComponentInfo";
import { filter, isNil } from "lodash-es";

export const useGetComponentId = () => {
  const { getComponentInfo, getCompentParentInfo } = useGetComponentInfo();

  const getParentComponentId = useCallback(
    (targetId: string) => {
      const { parentId } = getComponentInfo(targetId);
      return parentId;
    },
    [getComponentInfo]
  );

  const getSiblingIds = useCallback(
    (targetId: string) => {
      const parentInfo = getCompentParentInfo(targetId);
      if (isNil(parentInfo)) {
        return [];
      }
      return filter(parentInfo.childsId, (id) => id !== targetId);
    },
    [getCompentParentInfo]
  );

  return {
    getParentComponentId,
    getSiblingIds,
  };
};
