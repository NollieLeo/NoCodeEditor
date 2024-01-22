import { transaction } from "mobx";
import { MetaInfo } from "../types/Meta";
import { useEditorContext } from "./useEditorContext";
import { GenComponentsReturns, useGenComponents } from "./useGenComponents";
import { GenMetaReturns, useGenMeta } from "./useGenMeta";

export type OnAdd = (
  params: Required<Pick<MetaInfo, "parentId" | "type">> &
    Partial<Pick<MetaInfo, "attrs">>,
  scopeId: string,
  index?: number
) => { metas: GenMetaReturns; components: GenComponentsReturns };

export const useEditorTriggers = () => {
  const { editorStore } = useEditorContext();

  const { genMetas } = useGenMeta();
  const { genComponents } = useGenComponents();

  const onAdd: OnAdd = (params, scopeId, index) => {
    const metas = genMetas(params);
    const components = genComponents({ metas, scopeId });

    transaction(() => {
      editorStore.addMetas(metas, index);
      editorStore.addComponents(components, index);
    });

    return {
      metas,
      components,
    };
  };

  return {
    onAdd,
  };
};
