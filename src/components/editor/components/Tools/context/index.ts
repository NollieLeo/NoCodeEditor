import { EditorState } from "@/components/editor/stores/EditorStore";
import { createContext } from "react";

export interface ToolsContextData {
  panState: NonNullable<EditorState["panState"]>;
}

export const ToolsContext = createContext<ToolsContextData>({} as any);
