import { FC, memo } from "react";
import { FocusedTools } from "./components/FocusedTools";
import { TOOL_WRAPPER_ID } from "./constants";
import { HoveredNodeTool } from "./components/HoveredNodeTool";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import { OverHighlight } from "./components/OverHighlight";
import { InsertHighlight } from "./components/InsertHighlight";
import "./index.scss";
import { SnapTools } from "./components/SnapTools";
import { useDragInfo } from "../../hooks/useDragInfo";

const ToolsContentComps: FC = observer(() => {
  const {
    editorStore: { focusedInfo, hoveredNodeId },
  } = useEditorContext();

  const dragInfo = useDragInfo();

  const renderOverHighlight = () => {
    if (!dragInfo) {
      return <></>;
    }
    return <OverHighlight dragInfo={dragInfo} />;
  };

  const renderFocusedTools = () => {
    if (!focusedInfo) {
      return <></>;
    }
    return <FocusedTools focusedInfo={focusedInfo} />;
  };

  const renderHoveredHighlight = () => {
    if (!!dragInfo || !hoveredNodeId || hoveredNodeId === focusedInfo?.id) {
      return <></>;
    }
    return <HoveredNodeTool hoveredNodeId={hoveredNodeId} />;
  };

  return (
    <div className="tools-wrapper" id={TOOL_WRAPPER_ID}>
      {renderOverHighlight()}
      <InsertHighlight />
      <SnapTools />
      {renderFocusedTools()}
      {renderHoveredHighlight()}
    </div>
  );
});

export const ToolsContent = memo(ToolsContentComps);
