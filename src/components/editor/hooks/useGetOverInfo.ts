import { useDndContext } from "@dnd-kit/core";
import { DropInfo } from "../types";
import { useMemo } from "react";

export function useGetOverInfo() {
  const { over } = useDndContext();

  const overInfo = useMemo(() => {
    return over?.data.current as DropInfo | undefined;
  }, [over?.data]);

  return overInfo;
}
