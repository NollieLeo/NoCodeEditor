import { Modifier } from "@dnd-kit/core";
import { useEditorContext } from "./useEditorContext";

export default function useEditorDndModifiers() {
  const {
    editorStore: {
      panState: { scale },
    },
  } = useEditorContext();

  const scaledTransformerModifier: Modifier = (args) => {
    const { transform } = args;
    const res = {
      ...transform,
      scaleX: transform.scaleX * scale,
      scaleY: transform.scaleY * scale,
    };
    return res;
  };

  return [scaledTransformerModifier];
}
