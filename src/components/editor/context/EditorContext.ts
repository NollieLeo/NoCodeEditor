import { createContext } from "react";
import { EditorStore } from "../stores/EditorStore";
import { Scope } from "../types/Scope";

interface EditorContext {
  editorStore: EditorStore;
  scope: Scope;
}

export const EditorContext = createContext<EditorContext>({} as any);
