import { CSSProperties, ReactNode } from "react";

export enum ComponentTypes {
  BUTTON = "button",
  TEXT = "text",
  INPUT = "input",
  TEXTAREA = "textarea",
  CONTAINER = "container",
  PAGE = "page",
}

export interface SiderDragCompInfo {
  type: ComponentTypes;
}

export interface SchemaData {
  id: string;
  type: ComponentTypes;
  parentId?: string | null;
  childNodes?: SchemaData[];
  data: {
    style: CSSProperties;
    children?: ReactNode;
  };
}
