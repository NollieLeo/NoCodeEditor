import { CSSProperties, PropsWithChildren } from "react";

export enum ComponentTypes {
  BUTTON = "button",
  TEXT = "text",
  INPUT = "input",
  TEXTAREA = "textarea",
  CONTAINER = "container",
  PAGE = "page",
}

export type ComponentRenderData = PropsWithChildren<
  {
    style?: CSSProperties;
  } & Record<string, unknown>
>;
