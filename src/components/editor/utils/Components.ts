import { MetaInfo } from "../types/Meta";
// import { AnyObject } from "../types/AnyObject";

export const genComponentId = (metaId: MetaInfo["id"], scopeId: string) => {
  return [metaId, scopeId].join("-");
};

// export function makeMetaComponent<T = AnyObject>(id: string, component: (props: ScenaProps & T) => React.ReactElement<any, any>): ScenaFunctionComponent<T> {
//   (component as ScenaFunctionComponent<T>).scenaComponentId = id;

//   return component as ScenaFunctionComponent<T>;
// }
