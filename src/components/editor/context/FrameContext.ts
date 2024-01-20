import { createContext } from "react";
import { Scope } from "../types/Scope";

interface FrameContextData {
  scopeId: keyof Scope;
}

export const FrameContext = createContext<FrameContextData>({} as any);
