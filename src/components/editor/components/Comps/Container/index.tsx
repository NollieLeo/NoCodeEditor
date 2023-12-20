import { FC } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Container: FC<ComponentRenderData> = (props) => {
  return <div {...props} />;
};
