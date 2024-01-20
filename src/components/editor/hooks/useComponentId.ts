import { useCallback } from "react";
import { useComponentInfo } from "./useComponentInfo";
import { filter, isNil } from "lodash-es";

export const useComponentId = () => {
  const { getComponentInfo, getNodeParentInfo } = useComponentInfo();

  const getNodeParentId = useCallback(
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
    getNodeParentId,
    getSiblingIds,
  };
};
