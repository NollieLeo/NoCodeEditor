import { createContext } from "react";
import { EditorStore } from "../stores/EditorStore";

interface EditorContext {
  editorStore: EditorStore;
}

export const EditorContext = createContext<EditorContext>({} as any);
