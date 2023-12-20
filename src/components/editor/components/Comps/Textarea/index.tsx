import { FC } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Textarea: FC<ComponentRenderData> = (props) => {
  return <textarea {...props} />;
};
