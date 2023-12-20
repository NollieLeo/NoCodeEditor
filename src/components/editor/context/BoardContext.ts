import { createContext } from "react";
import { BoardStore } from "../stores/BoardStore";

interface BoardContext {
  boardStore: BoardStore;
}

export const BoardContext = createContext<BoardContext>({} as any);
