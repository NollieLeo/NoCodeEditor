import { FC, memo } from "react";
import { BorderedRectangle } from "../BorderedRectangle";
import { EditorState } from "@/components/editor/stores/EditorStore";

interface FocusedHighlightProps {
  focusedInfo: NonNullable<EditorState["focusedInfo"]>;
}

const FocusedHighlightComp: FC<FocusedHighlightProps> = ({ focusedInfo }) => {
  const activeNodeDom = document.getElementById(String(focusedInfo.id));

  if (!activeNodeDom) {
    return <></>;
  }

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    left: domLeft,
  } = activeNodeDom.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    zIndex: 2,
    left: domLeft,
  };

  return <BorderedRectangle style={style} anchorPoint />;
};

export const FocusedHighlight = memo(FocusedHighlightComp);
