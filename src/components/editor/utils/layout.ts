import { isNil } from "lodash-es";

/**
 * @description TODO(wkm) 暂时只针对flex布局，因为必须有一种布局目前
 */
export function getFlexLayoutDirection(dom: HTMLElement | null) {
  if (isNil(dom) || dom?.style.display !== "flex") {
    return null;
  }
  return dom.style.flexDirection === "column" ? "vertical" : "horizontal";
}
