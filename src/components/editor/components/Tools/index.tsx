import "./index.scss";
import { memo, useRef } from "react";
import { ActiveNodeTool } from "./components/ActiveNodeTool";
import { TOOL_WRAPPER_ID } from "./constants";
import { OverNodeTool } from "./components/OverNodeTool";
import { HoveredNodeTool } from "./components/HoveredNodeTool";

export const ToolsComps = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className="tools-wrapper" id={TOOL_WRAPPER_ID} ref={wrapperRef}>
      <OverNodeTool />
      <ActiveNodeTool />
      <HoveredNodeTool />
    </div>
  );
};

export const Tools = memo(ToolsComps);
