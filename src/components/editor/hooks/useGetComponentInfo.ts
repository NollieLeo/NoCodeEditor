import { useCallback } from "react";
import { useEditorContext } from "./useEditorContext";
import { ComponentInfo } from "../types";
import { isNil, map } from "lodash-es";

export const useGetComponentInfo = () => {
  const {
    editorStore: { componentsInfo },
  } = useEditorContext();

  const getComponentInfo = useCallback(
    (targetId: ComponentInfo["id"]) => {
      const target = componentsInfo[targetId];
      if (isNil(target)) {
        throw new Error(`node: ${targetId} does not exist`);
      }
      return target;
    },
    [componentsInfo]
  );

  const getNodeParentInfo = useCallback(
    (targetId: ComponentInfo["id"]) => {
      const target = getComponentInfo(targetId);
      const { parentId } = target;
      if (isNil(parentId)) {
        return null;
      }
      return getComponentInfo(parentId);
    },
    [getComponentInfo]
  );

  const getNodeSiblingsInfo = useCallback(
    (targetId: ComponentInfo["id"]) => {
      const target = getComponentInfo(targetId);
      const { childsId } = target;
      if (isNil(childsId)) {
        return [];
      }
      return map(childsId, (childId) => getComponentInfo(childId));
    },
    [getComponentInfo]
  );

  return {
    getNodeSiblingsInfo,
    getNodeParentInfo,
    getComponentInfo,
  };
};
