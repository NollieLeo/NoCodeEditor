import { useContext } from "react";
import { ToolsContext } from "../context";

export const useToolsContext = () => {
  return useContext(ToolsContext);
};
