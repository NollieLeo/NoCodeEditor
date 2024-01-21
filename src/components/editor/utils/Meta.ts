import { uniqueId } from "lodash-es";
import { COMPONENTS_INFO } from "../constants";
import { MetaInfo } from "../types/Meta";

export const createMeta = (
  params: Pick<MetaInfo, "type"> & Partial<MetaInfo>
): MetaInfo => {
  const { type, parentId, attrs = {}, childsId = null } = params;
  const { attrs: defaultAttrs } = COMPONENTS_INFO[type];

  return {
    id: uniqueId(),
    parentId,
    type,
    childsId,
    attrs: {
      ...defaultAttrs,
      ...attrs,
    },
  };
};
