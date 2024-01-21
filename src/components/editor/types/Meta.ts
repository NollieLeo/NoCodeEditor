import { AnyObject } from "./AnyObject";
import { ComponentTypes } from "./Components";

export interface MetaInfo {
  id: string;
  type: ComponentTypes;
  name?: string;
  parentId?: string | null;
  childsId?: string[] | null;
  attrs: AnyObject;
}
