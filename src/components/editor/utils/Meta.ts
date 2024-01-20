import { uniqueId } from "lodash-es";
import { COMPONENTS_INFO } from "../constants";
import { MetaInfo } from "../types/Meta";

export const createMeta = (
  params: Pick<MetaInfo, "type"> & Partial<MetaInfo>
): MetaInfo => {
  const { type, parentId, ...res } = params;
  const { attrs } = COMPONENTS_INFO[type];

  return {
    parentId,
    id: uniqueId(),
    type,
    childsId: null,
    attrs,
    ...res,
  };
};
