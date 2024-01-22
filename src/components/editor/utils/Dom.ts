import { filter, isNil, map } from "lodash-es";
import {
  DATA_COMPONENT_ID,
  DATA_COMPONENT_OVERLAY_ID,
  DATA_COMPONENT_TYPE,
} from "../constants";
import { ComponentTypes } from "../types";

export function getDomId(el: HTMLElement) {
  return el.getAttribute(DATA_COMPONENT_ID)!;
}

export function getDomType(el: HTMLElement) {
  return el.getAttribute(DATA_COMPONENT_TYPE)!;
}

export function getDomById(id: number | string) {
  return document.querySelector<HTMLElement>(`[${DATA_COMPONENT_ID}="${id}"]`);
}

export function getDomsByIds(ids: string) {
  return filter(
    map(ids, (id) => getDomById(id)),
    (dom) => !isNil(dom)
  );
}

export function getTypeByDomId(id: number | string) {
  const dom = getDomById(id);
  return getDomType(dom!);
}

export function getDomsByType(type: ComponentTypes) {
  return document.querySelectorAll<HTMLElement>(
    `[${DATA_COMPONENT_TYPE}="${type}"]`
  );
}

export function getDomByOverlayId(overlayId: number | string) {
  return document.querySelector<HTMLElement>(
    `[${DATA_COMPONENT_OVERLAY_ID}="${overlayId}"]`
  );
}
