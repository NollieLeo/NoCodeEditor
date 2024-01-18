import { useDndContext } from "@dnd-kit/core";
import { DropInfo } from "../types";
import { useMemo } from "react";

export function useGetOverNode() {
  const { over } = useDndContext();

  const overInfo = useMemo(() => {
    return over?.data.current as DropInfo | undefined;
  }, [over?.data]);

  return overInfo;
}
