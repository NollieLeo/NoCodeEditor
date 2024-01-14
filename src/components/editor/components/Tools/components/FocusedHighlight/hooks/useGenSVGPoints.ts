import { useMemo } from "react";
import { PointRecord } from "../types";

export default function useGenSVGPoints(domRect?: DOMRect) {
  const pointsRecords: PointRecord[] = useMemo(() => {
    if (!domRect) {
      return [];
    }
    const { left, right, bottom, top } = domRect;
    return [
      {
        cx: left,
        cy: top,
        position: "top-left",
      },
      {
        cx: right,
        cy: top,
        position: "top-right",
      },
      {
        cx: left,
        cy: bottom,
        position: "bottom-left",
      },
      {
        cx: right,
        cy: bottom,
        position: "bottom-right",
      },
    ];
  }, [domRect]);

  return pointsRecords;
}
