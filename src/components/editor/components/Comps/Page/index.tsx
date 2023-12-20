import { FC } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Page: FC<ComponentRenderData> = (props) => {
  return <div {...props} />;
};
