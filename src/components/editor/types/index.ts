import { CSSProperties, ReactNode } from "react";
import { ComponentTypes } from "./Components";

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

export * from "./Components";
export * from "./Dnd";
