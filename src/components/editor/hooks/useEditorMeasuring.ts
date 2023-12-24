import { MeasuringConfiguration } from "@dnd-kit/core";

export function useEditorMeasuring(): MeasuringConfiguration {
  return {
    droppable: {
      // measure(ele) {
      //   console.log(ele);
      //   return {
      //     ...ele.getBoundingClientRect(),
      //   };
      // },
    },
  };
}
