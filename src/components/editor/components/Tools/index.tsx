import "./index.scss";
import { FC, memo, useRef } from "react";
import { ActiveNodeTool } from "./components/ActiveNodeTool";
import { TOOL_WRAPPER_ID } from "./constants";
import { OverNodeTool } from "./components/OverNodeTool";
import { HoveredNodeTool } from "./components/HoveredNodeTool";

export const ToolsComps: FC<{ visible?: boolean }> = ({ visible }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const renderTools = () => {
    if (!visible) {
      return <></>;
    }
    return (
      <>
        <OverNodeTool />
        <ActiveNodeTool />
        <HoveredNodeTool />
      </>
    );
  };

  return (
    <div className="tools-wrapper" id={TOOL_WRAPPER_ID} ref={wrapperRef}>
      {renderTools()}
    </div>
  );
};

export const Tools = memo(ToolsComps);
