import { useCallback } from "react";
import { useEditorContext } from "./useEditorContext";
import { SchemaData } from "../types";
import { isNil, map } from "lodash-es";

export const useGetNodeInfo = () => {
  const {
    editorStore: { nodesMap },
  } = useEditorContext();

  const getNodeInfo = useCallback(
    (targetId: SchemaData["id"]) => {
      const target = nodesMap[targetId];
      if (isNil(target)) {
        throw new Error(`node: ${targetId} does not exist`);
      }
      return nodesMap[targetId];
    },
    [nodesMap]
  );

  const getNodeParentInfo = useCallback(
    (targetId: SchemaData["id"]) => {
      const target = getNodeInfo(targetId);
      const { parentId } = target;
      if (isNil(parentId)) {
        return null;
      }
      return getNodeInfo(parentId);
    },
    [getNodeInfo]
  );

  const getNodeSiblingsInfo = useCallback(
    (targetId: SchemaData["id"]) => {
      const target = getNodeInfo(targetId);
      const { childNodes } = target;
      if (isNil(childNodes)) {
        return [];
      }
      return map(childNodes, (childId) => getNodeInfo(childId));
    },
    [getNodeInfo]
  );

  return {
    getNodeSiblingsInfo,
    getNodeParentInfo,
    getNodeInfo,
  };
};
