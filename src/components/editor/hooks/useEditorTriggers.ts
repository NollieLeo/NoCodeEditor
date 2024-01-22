import { transaction } from "mobx";
import { MetaInfo } from "../types/Meta";
import { useEditorContext } from "./useEditorContext";
import { GenComponentsReturns, useGenComponents } from "./useGenComponents";
import { GenMetaReturns, useGenMeta } from "./useGenMeta";
import { useGetMetaInfo } from "./useGetMetaInfo";
import { useGetComponentInfo } from "./useGetComponentInfo";

export type OnAdd = (
  params: Required<Pick<MetaInfo, "parentId" | "type">> &
    Partial<Pick<MetaInfo, "attrs">>,
  scopeId: string,
  index?: number
) => { metas: GenMetaReturns; components: GenComponentsReturns };

export type onUpdateAttr<
  Key extends keyof MetaInfo["attrs"] = keyof MetaInfo["attrs"]
> = (id: string, attrName: Key, value: MetaInfo["attrs"][Key]) => void;

export const useEditorTriggers = () => {
  const { editorStore } = useEditorContext();
  const { getMetaInfo } = useGetMetaInfo();
  const { getComponentInfo } = useGetComponentInfo();

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

  const onUpdateAttrByCompId: onUpdateAttr = (compId, attrName, value) => {
    const componentInfo = getComponentInfo(compId);
    const meta = getMetaInfo(componentInfo.metaId);
    transaction(() => {
      editorStore.updateMetaAttr(meta.id, attrName, value);
      editorStore.updateComponentAttr(compId, attrName, value);
    });
  };

  return {
    onAdd,
    onUpdateAttrByCompId,
  };
};
