import { FC, memo } from "react";
import { FocusedTools } from "./components/FocusedTools";
import { TOOL_WRAPPER_ID } from "./constants";
import { HoveredNodeTool } from "./components/HoveredNodeTool";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import { OverHighlight } from "./components/OverHighlight";
import { InsertHighlight } from "./components/InsertHighlight";
import "./index.scss";
import { CollisionTools } from "./components/SnapTools";
import { useGetDragInfo } from "../../hooks/useGetDragInfo";

const ToolsContentComps: FC = observer(() => {
  const {
    editorStore: { focusedInfo, hoveredNodeId },
  } = useEditorContext();

  const dragInfo = useGetDragInfo();

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
      <CollisionTools />
      {renderFocusedTools()}
      {renderHoveredHighlight()}
    </div>
  );
});

export const ToolsContent = memo(ToolsContentComps);
