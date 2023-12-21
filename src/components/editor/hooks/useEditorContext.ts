import { useContext } from "react";
import { EditorContext } from "@/components/editor/context/EditorContext";

export const useEditorContext = () => {
  return useContext(EditorContext);
};
