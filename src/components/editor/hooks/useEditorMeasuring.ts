import { MeasuringConfiguration, MeasuringStrategy } from "@dnd-kit/core";
import { useMemo } from "react";

export function useEditorMeasuring(): MeasuringConfiguration {
  const config = useMemo(() => {
    return {
      droppable: {
        frequency: MeasuringStrategy.Always,
      },
    };
  }, []);
  return config;
}
