import { CSSProperties, PropsWithChildren } from "react";

export type ComponentRenderData = PropsWithChildren<
  {
    style?: CSSProperties;
  } & Record<string, unknown>
>;
