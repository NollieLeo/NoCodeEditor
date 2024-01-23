import { isNil, map } from "lodash-es";
import { ComponentInfo, ComponentTypes } from "@/components/editor/types";
import { MetaInfo } from "@/components/editor/types/Meta";
import { genComponentId } from "@/components/editor/utils/Components";
import { GenMetaReturns } from "../useCreateMetas";

export type GenComponentsParams = {
  metas: GenMetaReturns;
  scopeId: string;
};

export type GenComponentsReturns = [ComponentInfo, ComponentInfo[] | null];

export const useCreateComponents = () => {
  const createComponentInfo = (meta: MetaInfo, scopeId: string) => {
    return {
      name: meta.name ?? meta.type,
      id: genComponentId(meta.id, scopeId),
      type: meta.type,
      parentId: meta.parentId ? genComponentId(meta.parentId, scopeId) : null,
      metaId: meta.id,
      childsId: meta.childsId
        ? map(meta.childsId, (childId) => genComponentId(childId, scopeId))
        : null,
      scopeId,
      attrs: meta.attrs,
    };
  };

  const createDefaultComps = (
    params: GenComponentsParams
  ): GenComponentsReturns => {
    const {
      metas: [rootMeta, childMetas],
      scopeId,
    } = params;

    const rootComponent: ComponentInfo = createComponentInfo(rootMeta, scopeId);

    const childComponents = !isNil(childMetas)
      ? map(childMetas, (meta) => createComponentInfo(meta, scopeId))
      : null;

    return [rootComponent, childComponents];
  };

  const createConditonalComps = (
    params: GenComponentsParams
  ): GenComponentsReturns => {
    const [rootComponent, childComponents] = createDefaultComps(params);

    const tempChildComponents = map(
      childComponents,
      ({ attrs, ...res }, index) => {
        const display = index === 0 ? attrs.style.display : "none";
        const style = {
          ...attrs.style,
          display,
        };
        return {
          ...res,
          attrs: {
            ...attrs,
            style,
          },
        };
      }
    );

    return [rootComponent, tempChildComponents];
  };

  const createComponents = (params: GenComponentsParams): GenComponentsReturns => {
    const {
      metas: [rootMeta],
    } = params;

    switch (rootMeta.type) {
      case ComponentTypes.CONDITIONAL_CONTAINER:
        return createConditonalComps(params);
      default:
        return createDefaultComps(params);
    }
  };

  return {
    createComponents,
  };
};
