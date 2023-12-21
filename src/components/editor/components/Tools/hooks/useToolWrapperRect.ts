import { useLayoutEffect, useRef } from "react";
import { TOOL_WRAPPER_ID } from "../constants";

export default function useToolWrapperRect() {
  const toolWrapperRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const wrapperTarget = document.getElementById(TOOL_WRAPPER_ID);
    toolWrapperRef.current = wrapperTarget;
  });

  return toolWrapperRef.current?.getBoundingClientRect();
}
