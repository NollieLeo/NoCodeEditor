import { FC } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Input: FC<ComponentRenderData> = (props) => {
  return <input {...props} />;
};
