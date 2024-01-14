import { SVGAttributes } from "react";

export interface LineRecord
  extends Pick<SVGAttributes<SVGLineElement>, "x1" | "x2" | "y1" | "y2"> {
  position: "top" | "left" | "bottom" | "right";
}

export interface PointRecord
  extends Pick<SVGAttributes<SVGCircleElement>, "cx" | "cy"> {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
