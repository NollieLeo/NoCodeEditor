import { useCallback } from "react";
import { useEditorContext } from "./useEditorContext";
import { ComponentInfo, ComponentTypes } from "../types";
import { getTypeByDomId } from "../utils/Dom";
import { useGetComponentId } from "./useGetComponentId";
import { isNil } from "lodash-es";

export const useSelectComponent = () => {
  const { editorStore } = useEditorContext();
  const { getParentComponentId } = useGetComponentId();

  const onSelectComponent = useCallback(
    (id?: ComponentInfo["id"]) => {
      if (isNil(id)) {
        editorStore.cleanUpHelperNode();
        return;
      }
      requestAnimationFrame(() => {
        const type = getTypeByDomId(id);
        let selectId = id;
        if (type === ComponentTypes.BLANK_CONTAINER) {
          selectId = getParentComponentId(id)!;
        }
        editorStore.setFocusedInfo({
          id: selectId,
        });
      });
    },
    [editorStore, getParentComponentId]
  );

  return {
    onSelectComponent,
  };
};
