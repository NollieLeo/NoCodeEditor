import { CSSProperties } from "react";

export enum ComponentTypes {
  BUTTON = "button",
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
  children?: SchemaData[];
  data: {
    style: CSSProperties;
  };
}
