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
  CONDITIONAL_CONTAINER = "conditional-container",
  BLANK_CONTAINER = "blank-container",
}

export enum ComponentPosition {
  ABSOLUTE = "absolute",
  RELATIVE = "relative",
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
  /** 元数据id */
  metaId: MetaInfo["id"];
  /** component id */
  id: string;
  /** component name default to component type */
  name?: string;
  /** component type */
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

// export type MetaComponentProps = {};

// export type MetaComponent<T> = ((
//   props: T & MetaComponentProps
// ) => React.ReactElement<any, any>) & { componentId: string };
