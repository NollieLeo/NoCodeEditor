import { DATA_COMPONENT_ID, DATA_COMPONENT_TYPE } from "../constants";
import { ComponentTypes } from "../types";

export function getDomId(el: HTMLElement) {
  return el.getAttribute(DATA_COMPONENT_ID)!;
}

export function getDomById(id: string) {
  return document.querySelector<HTMLElement>(`[${DATA_COMPONENT_ID}="${id}"]`);
}

export function getDomsByType(type: ComponentTypes) {
  return document.querySelectorAll<HTMLElement>(
    `[${DATA_COMPONENT_TYPE}="${type}"]`
  );
}
