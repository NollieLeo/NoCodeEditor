import { isNil, map } from "lodash-es";
import { genComponentId } from "../utils/Components";
import { GenMetaReturns } from "./useGenMeta";
import { ComponentInfo, ComponentTypes } from "../types";
import { MetaInfo } from "../types/Meta";

export type GenComponentsParams = {
  metas: GenMetaReturns;
  scopeId: string;
};

export type GenComponentsReturns = [ComponentInfo, ComponentInfo[] | null];

export const useGenComponents = () => {
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

  const genDefaultComponents = (
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

  const genConditionalContainerComponent = (
    params: GenComponentsParams
  ): GenComponentsReturns => {
    const [rootComponent, childComponents] = genDefaultComponents(params);

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

  const genComponents = (params: GenComponentsParams): GenComponentsReturns => {
    const {
      metas: [rootMeta],
    } = params;

    switch (rootMeta.type) {
      case ComponentTypes.CONDITIONAL_CONTAINER:
        return genConditionalContainerComponent(params);
      default:
        return genDefaultComponents(params);
    }
  };

  return {
    genComponents,
  };
};
