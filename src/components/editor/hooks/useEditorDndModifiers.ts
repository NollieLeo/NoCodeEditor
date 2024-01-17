import { Modifier } from "@dnd-kit/core";

export default function useEditorDndModifiers() {
  const distanceFormatModifier: Modifier = (args) => {
    const { transform } = args;
    const res = {
      ...transform,
      x: Math.floor(transform.x),
      y: Math.floor(transform.y),
    };
    return res;
  };

  return [distanceFormatModifier];
}
