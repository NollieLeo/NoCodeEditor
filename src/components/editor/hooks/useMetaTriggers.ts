import { useCallback } from "react";
import { MetaInfo } from "../types/Meta";
import { createMeta } from "../utils/Meta";

export const useMetaTriggers = () => {
  const onAddMeta = useCallback(
    (params: Pick<MetaInfo, "type"> & Partial<MetaInfo>) => {
      const newMeta = createMeta(params);
      return newMeta;
    },
    []
  );

  const onDeleteMeta = useCallback((metaId: MetaInfo["id"]) => {}, []);

  return {
    onDeleteMeta,
    onAddMeta,
  };
};
