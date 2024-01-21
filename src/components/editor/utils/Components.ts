import { map } from "lodash-es";
import { ComponentInfo } from "../types";
import { MetaInfo } from "../types/Meta";
// import { AnyObject } from "../types/AnyObject";

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
  const { id, type, parentId, childsId, name } = meta;

  return {
    id: genComponentId(id, scopeId),
    name: name || type,
    type,
    parentId: parentId ? genComponentId(parentId, scopeId) : null,
    meta,
    childsId: map(childsId, (childId) => genComponentId(childId, scopeId)),
    scopeId,
    attrs: genAttrs(meta),
  };
};

// export function makeMetaComponent<T = AnyObject>(id: string, component: (props: ScenaProps & T) => React.ReactElement<any, any>): ScenaFunctionComponent<T> {
//   (component as ScenaFunctionComponent<T>).scenaComponentId = id;

//   return component as ScenaFunctionComponent<T>;
// }
