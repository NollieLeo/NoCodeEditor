import { useCallback } from "react";
import { MetaInfo } from "../types/Meta";
import { ComponentTypes } from "../types";
import { COMPONENTS_INFO } from "../constants";
import { assign, map, uniqueId } from "lodash-es";

export type GenMetaParams = Pick<MetaInfo, "type"> & Partial<MetaInfo>;
export type GenMetaReturns = [MetaInfo, MetaInfo[] | null];

export const useGenMeta = () => {
  const genDefaultMeta = useCallback((params: GenMetaParams): MetaInfo => {
    const { attrs: defaultAttrs, name: defaultName } =
      COMPONENTS_INFO[params.type];
    return {
      id: params.id ?? uniqueId(),
      type: params.type,
      name: params.name ?? defaultName,
      // TODO(wkm) 先随便处理attrs
      attrs: {
        ...assign({}, defaultAttrs, params.attrs),
        style: { ...defaultAttrs.style, ...params.attrs?.style },
      },
      parentId: params.parentId,
      childsId: params.childsId,
    };
  }, []);

  const genConditionalContainerMetas = useCallback(
    (params: GenMetaParams): GenMetaReturns => {
      const rootMeta = genDefaultMeta(params);
      const defaultChilds = [
        {
          type: ComponentTypes.BLANK_CONTAINER,
          name: "条件1",
          parentId: rootMeta.id,
          attrs: { style: { background: "red" } },
          childsId: [],
        },
        {
          type: ComponentTypes.BLANK_CONTAINER,
          name: "Loading",
          parentId: rootMeta.id,
          attrs: { style: { background: "blue" } },
          childsId: [],
        },
      ];
      const childMetas = map(defaultChilds, (value) => genDefaultMeta(value));
      rootMeta.childsId = map(childMetas, (value) => value.id);
      return [rootMeta, childMetas];
    },
    [genDefaultMeta]
  );

  const genContainerMetas = useCallback(
    (params: GenMetaParams): GenMetaReturns => {
      const rootMeta = genDefaultMeta(params);
      rootMeta.childsId = [];
      return [rootMeta, null];
    },
    [genDefaultMeta]
  );

  const genMetas = useCallback(
    (params: GenMetaParams): GenMetaReturns => {
      const { type } = params;
      switch (type) {
        case ComponentTypes.CONDITIONAL_CONTAINER:
          return genConditionalContainerMetas(params);
        case ComponentTypes.CONTAINER:
        case ComponentTypes.BLANK_CONTAINER:
          return genContainerMetas(params);
        default:
          return [genDefaultMeta(params), null];
      }
    },
    [genConditionalContainerMetas, genContainerMetas, genDefaultMeta]
  );

  return {
    genMetas,
  };
};
