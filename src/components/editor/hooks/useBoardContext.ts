import { useContext } from "react";
import { BoardContext } from "@/components/editor/context/BoardContext";

export const useBoardContext = () => {
  return useContext(BoardContext);
};
