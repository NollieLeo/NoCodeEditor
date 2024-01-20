import { CSSProperties, PropsWithChildren } from "react";
import { MetaInfo } from "./Meta";
import { AnyObject } from "./AnyObject";

export enum ComponentTypes {
  BUTTON = "button",
  TEXT = "text",
  INPUT = "input",
  TEXTAREA = "textarea",
  CONTAINER = "container",
  SELECT = "select",
  PAGE = "page",
}

export type ComponentRenderData = PropsWithChildren<
  {
    style?: CSSProperties;
  } & Record<string, unknown>
>;

export interface ComponentAttrs extends AnyObject {
  style: CSSProperties;
} 

export interface ComponentInfo {
  /** 元数据 */
  meta: MetaInfo;
  /** component id */
  id: string;
  /** component name */
  type: ComponentTypes;
  /** 父组件 id */
  parentId?: string | null;
  /** 当前渲染时的 子组件 */
  childsId?: string[] | null;
  /** attrs */
  attrs: ComponentAttrs;
  /** scopeId */
  scopeId: string;
  /** innerText */
  innerText?: string;
}

export type MetaComponentProps = {
  
}


export type MetaComponent<T> = ((props: T & MetaComponentProps) => React.ReactElement<any, any>) & { componentId: string };
