import { CSSProperties, ReactNode } from "react";
import { ComponentTypes } from "./Components";
export interface SchemaData {
  id: string;
  type: ComponentTypes;
  parentId: string | null;
  childsId: string[] | null;
  data: {
    style: CSSProperties;
    children: ReactNode;
  };
}

export * from "./Components";
export * from "./Dnd";
