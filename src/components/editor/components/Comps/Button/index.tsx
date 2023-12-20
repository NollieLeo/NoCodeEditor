import { FC } from "react";
import { ComponentRenderData } from "../../../types/Components";

export const Button: FC<ComponentRenderData> = (props) => {
  return <button {...props} />;
};
