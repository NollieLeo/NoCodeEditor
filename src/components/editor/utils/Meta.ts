import { uniqueId } from "lodash-es";
import { COMPONENTS_INFO } from "../constants";
import { MetaInfo } from "../types/Meta";

export const genMeta = (
  params: Pick<MetaInfo, "type"> & Partial<MetaInfo>
): MetaInfo => {
  const { type, parentId, attrs = {}, childsId = null, name, ...res } = params;
  const { attrs: defaultAttrs } = COMPONENTS_INFO[type];

  return {
    parentId,
    id: uniqueId(),
    name: name || type,
    type,
    childsId,
    ...res,
    attrs: {
      ...defaultAttrs,
      ...attrs,
    },
  };
};
