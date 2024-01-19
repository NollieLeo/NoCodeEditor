import { filter } from "lodash-es";
import { useCallback } from "react";
import { useEditorContext } from "./useEditorContext";

export default function useGetSiblings() {
  const {
    editorStore: { nodesMap },
  } = useEditorContext();

  const getSiblingIds = useCallback(
    (targetId: string) => {
      const target = nodesMap[targetId];
      if (!target || !target.parentId) {
        return [];
      }
      const { childNodes } = nodesMap[target.parentId];
      return filter(childNodes, (childId) => childId !== targetId);
    },
    [nodesMap]
  );

  return getSiblingIds;
}
