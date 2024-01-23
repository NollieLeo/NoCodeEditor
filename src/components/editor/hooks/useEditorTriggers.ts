import { transaction } from "mobx";
import { MetaInfo } from "../types/Meta";
import { useEditorContext } from "./useEditorContext";
import { GenComponentsReturns, useGenComponents } from "./useGenComponents";
import { GenMetaReturns, useGenMeta } from "./useGenMeta";
import { useGetMetaInfo } from "./useGetMetaInfo";
import { useGetComponentInfo } from "./useGetComponentInfo";
import { ComponentInfo } from "../types";

export type OnAdd = (
  params: Required<Pick<MetaInfo, "parentId" | "type">> &
    Partial<Pick<MetaInfo, "attrs">>,
  scopeId: string,
  index?: number
) => { metas: GenMetaReturns; components: GenComponentsReturns };

export type onUpdateAttr<
  Key extends keyof MetaInfo["attrs"] = keyof MetaInfo["attrs"]
> = (id: string, attrName: Key, value: MetaInfo["attrs"][Key]) => void;

export type onDelete = (id: ComponentInfo["id"]) => void;

export type OnChildPosMove = (
  fromCompId: ComponentInfo["id"],
  toCompId: ComponentInfo["id"]
) => void;

export const useEditorTriggers = () => {
  const { editorStore } = useEditorContext();
  const { getMetaInfo } = useGetMetaInfo();
  const { getComponentInfo, getCompentParentInfo } = useGetComponentInfo();

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

  const onDeleteByCompId: onDelete = (compId) => {
    const { metaId } = getComponentInfo(compId);
    transaction(() => {
      editorStore.deleteMeta(metaId);
      editorStore.deleteComponent(compId);
    });
  };

  const onMoveChildPosByCompId: OnChildPosMove = (fromCompId, toCompId) => {
    const { metaId: fromMetaId, parentId: fromParentCompId } =
      getComponentInfo(fromCompId);
    const { metaId: toMetaId, parentId: toParentCompId } =
      getComponentInfo(toCompId);
    if (!fromParentCompId || !toParentCompId || fromCompId === toCompId) {
      return;
    }
    const { metaId: fromParentMetaId } = getCompentParentInfo(fromCompId)!;
    const { metaId: toParentMetaId } = getCompentParentInfo(toCompId)!;
    // 确保其为同层级拖拽排序
    if (fromParentMetaId !== toParentMetaId) {
      return;
    }
    transaction(() => {
      editorStore.moveCompChildsPos(fromParentCompId, fromCompId, toCompId);
      editorStore.moveMetaChildsPos(toParentMetaId, fromMetaId, toMetaId);
    });
  };

  return {
    onAdd,
    onUpdateAttrByCompId,
    onDeleteByCompId,
    onMoveChildPosByCompId,
  };
};
