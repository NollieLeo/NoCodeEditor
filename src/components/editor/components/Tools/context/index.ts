import { createContext } from "react";

export interface ToolsContextData {
}

export const ToolsContext = createContext<ToolsContextData>({} as any);
