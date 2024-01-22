import { useCallback } from "react";
import { MetaInfo } from "../types/Meta";
import { useEditorContext } from "./useEditorContext";
import { ComponentInfo } from "../types";

export const useGetMetaInfo = () => {
  const {
    editorStore: { meta, componentsInfo },
  } = useEditorContext();

  const getMetaInfo = useCallback(
    (metaId: MetaInfo["id"]) => {
      return meta[metaId];
    },
    [meta]
  );

  const getMetaInfoByCompId = useCallback(
    (compId: ComponentInfo["id"]) => {
      return getMetaInfo(componentsInfo[compId].metaId);
    },
    [componentsInfo, getMetaInfo]
  );

  return {
    getMetaInfo,
    getMetaInfoByCompId,
  };
};
