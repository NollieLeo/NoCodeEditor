import { FC, memo } from "react";
import { FocusedHighlight } from "./components/FocusedHighlight";
import { TOOL_WRAPPER_ID } from "./constants";
import { HoveredNodeTool } from "./components/HoveredNodeTool";
import { useEditorContext } from "../../hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import { OverHighlight } from "./components/OverHighlight";
import { InsertHighlight } from "./components/InsertHighlight";
import "./index.scss";

const ToolsContentComps: FC = observer(() => {
  const {
    editorStore: { overInfo, draggingInfo, focusedInfo, hoveredNodeId },
  } = useEditorContext();

  const renderOverHighlight = () => {
    if (!overInfo || !draggingInfo) {
      return <></>;
    }
    return <OverHighlight overInfo={overInfo} draggingInfo={draggingInfo} />;
  };

  const renderFocusedHighlight = () => {
    if (!focusedInfo) {
      return <></>;
    }
    return <FocusedHighlight focusedInfo={focusedInfo} />;
  };

  const renderHoveredHighlight = () => {
    if (!hoveredNodeId) {
      return <></>;
    }
    return <HoveredNodeTool hoveredNodeId={hoveredNodeId} />;
  };

  return (
    <div className="tools-wrapper" id={TOOL_WRAPPER_ID}>
      {renderOverHighlight()}
      <InsertHighlight />
      {renderFocusedHighlight()}
      {renderHoveredHighlight()}
    </div>
  );
});

export const ToolsContent = memo(ToolsContentComps);
