import { createContext } from "react";
import { EditorStore } from "../stores/EditorStore";
import { Scope } from "../types/Scope";
import { MetaInfo } from "../types/Meta";

interface EditorContext {
  editorStore: EditorStore;
  scope: Scope;
  metas: Record<MetaInfo["id"], MetaInfo>;
}

export const EditorContext = createContext<EditorContext>({} as any);
