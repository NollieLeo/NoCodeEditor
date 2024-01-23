import { useCallback } from "react";
import { assign, map, uniqueId } from "lodash-es";
import { COMPONENTS_INFO } from "../../constants";
import { ComponentTypes } from "@/components/editor/types";
import { MetaInfo } from "@/components/editor/types/Meta";

export type GenMetaParams = Pick<MetaInfo, "type"> & Partial<MetaInfo>;
export type GenMetaReturns = [MetaInfo, MetaInfo[] | null];

export const useCreateMetas = () => {
  const createDefaultMeta = useCallback((params: GenMetaParams): MetaInfo => {
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

  const createConditionalMetas = useCallback(
    (params: GenMetaParams): GenMetaReturns => {
      const rootMeta = createDefaultMeta(params);
      const defaultChilds = [
        {
          type: ComponentTypes.BLANK_CONTAINER,
          name: "Loading",
          parentId: rootMeta.id,
          attrs: { style: { background: "#dddddd" } },
          childsId: [],
        },
        {
          type: ComponentTypes.BLANK_CONTAINER,
          name: "条件1",
          parentId: rootMeta.id,
          attrs: { style: { background: "#aeeddcb3" } },
          childsId: [],
        },
      ];
      const childMetas = map(defaultChilds, (value) => createDefaultMeta(value));
      rootMeta.childsId = map(childMetas, (value) => value.id);
      return [rootMeta, childMetas];
    },
    [createDefaultMeta]
  );

  const createContainerMetas = useCallback(
    (params: GenMetaParams): GenMetaReturns => {
      const rootMeta = createDefaultMeta(params);
      rootMeta.childsId = [];
      return [rootMeta, null];
    },
    [createDefaultMeta]
  );

  const createMetas = useCallback(
    (params: GenMetaParams): GenMetaReturns => {
      const { type } = params;
      switch (type) {
        case ComponentTypes.CONDITIONAL_CONTAINER:
          return createConditionalMetas(params);
        case ComponentTypes.CONTAINER:
        case ComponentTypes.BLANK_CONTAINER:
          return createContainerMetas(params);
        default:
          return [createDefaultMeta(params), null];
      }
    },
    [createConditionalMetas, createContainerMetas, createDefaultMeta]
  );

  return {
    createMetas,
  };
};
