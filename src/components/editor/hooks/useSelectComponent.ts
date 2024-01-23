import { useCallback } from "react";
import { useEditorContext } from "./useEditorContext";
import { ComponentInfo, ComponentTypes } from "../types";
import { getTypeByDomId } from "../utils/Dom";
import { useGetComponentId } from "./useGetComponentId";
import { isNil } from "lodash-es";

export const useSelectComponent = () => {
  const { editorStore } = useEditorContext();
  const { getParentComponentId } = useGetComponentId();

  const getSelectId = useCallback((compId: string) => {
    let selectedId = compId;
    const type = getTypeByDomId(compId);
    switch (type) {
      case ComponentTypes.BLANK_CONTAINER:
        selectedId = getParentComponentId(compId)!;
        break;
      default:
        break;
    }
    return selectedId;
  }, [getParentComponentId]);

  const onSelectComponent = useCallback(
    (id?: ComponentInfo["id"]) => {
      if (isNil(id)) {
        editorStore.cleanUpHelperNode();
        return;
      }
      requestAnimationFrame(() => {
        editorStore.setFocusedInfo({
          id: getSelectId(id),
        });
      });
    },
    [editorStore, getSelectId]
  );

  return {
    onSelectComponent,
  };
};
