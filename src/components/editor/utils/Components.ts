import { map } from "lodash-es";
import { ComponentInfo } from "../types";
import { MetaInfo } from "../types/Meta";

// TODO(wkm) 先随便处理attrs
const genAttrs = (meta: MetaInfo) => {
  const { attrs } = meta;
  const tempAttrs = { ...attrs } as ComponentInfo["attrs"];
  return tempAttrs;
};

export const genComponentId = (metaId: MetaInfo["id"], scopeId: string) => {
  return [metaId, scopeId].join("-");
};

export const genComponentInfo = (
  meta: MetaInfo,
  scopeId: string
): ComponentInfo => {
  const { id, type, parentId, childsId } = meta;

  return {
    id: genComponentId(id, scopeId),
    type,
    parentId: parentId ? genComponentId(parentId, scopeId) : null,
    meta,
    childsId: map(childsId, (childId) => genComponentId(childId, scopeId)),
    scopeId,
    attrs: genAttrs(meta),
  };
};
