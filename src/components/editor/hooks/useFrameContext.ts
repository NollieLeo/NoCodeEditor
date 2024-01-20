import { useContext } from "react";
import { FrameContext } from "../context/FrameContext";

export const useFrameContext = () => {
  return useContext(FrameContext);
};
