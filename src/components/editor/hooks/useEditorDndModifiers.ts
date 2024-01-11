import { Modifier } from "@dnd-kit/core";
import { useEditorContext } from "./useEditorContext";

export default function useEditorDndModifiers() {
  const {
    editorStore: { panState },
  } = useEditorContext();

  const scaledTransformerModifier: Modifier = (args) => {
    const { transform } = args;
    const curPanScale = panState?.scale || 1;
    const res = {
      ...transform,
      scaleX: transform.scaleX * curPanScale,
      scaleY: transform.scaleY * curPanScale,
    };
    return res;
  };

  return [scaledTransformerModifier];
}
