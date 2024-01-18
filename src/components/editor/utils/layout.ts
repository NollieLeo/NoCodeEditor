import { isNil } from "lodash-es";
import { CSSProperties } from "react";

/**
 * @description TODO(wkm) 暂时只针对flex布局，因为必须有一种布局目前
 */
export function getFlexLayoutDirection(dom: HTMLElement | null) {
  if (isNil(dom) || dom?.style.display !== "flex") {
    return null;
  }
  return dom.style.flexDirection === "column" ? "vertical" : "horizontal";
}

/**
 * @description 判断 postion 是否为 "fixed" | "absolute"
 */
export function isAbsoluteOrFixed(style?: CSSProperties | null) {
  if (!isNil(style)) {
    return style.position === "absolute" || style.position === "fixed";
  }
  return false;
}
