import { useMemo } from "react";
import { LineRecord } from "../types";

export default function useGenSVGLines(domRect?: DOMRect) {
  const lineRecords: LineRecord[] = useMemo(() => {
    if (!domRect) {
      return [];
    }
    const { left, right, bottom, top } = domRect;
    return [
      {
        x1: left,
        x2: right,
        y1: top,
        y2: top,
        position: "top",
      },
      {
        x1: right,
        x2: right,
        y1: top,
        y2: bottom,
        position: "right",
      },
      {
        x1: left,
        x2: right,
        y1: bottom,
        y2: bottom,
        position: "bottom",
      },
      {
        x1: left,
        x2: left,
        y1: top,
        y2: bottom,
        position: "left",
      },
    ];
  }, [domRect]);

  return lineRecords;
}
