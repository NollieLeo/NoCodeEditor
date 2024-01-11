import { MeasuringConfiguration } from "@dnd-kit/core";

export function useEditorMeasuring(): MeasuringConfiguration {
  return {
    draggable: {
      measure: (node) => {
        return node.getBoundingClientRect();
      },
    },
  };
}
