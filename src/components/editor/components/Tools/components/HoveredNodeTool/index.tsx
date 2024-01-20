import { FC, memo } from "react";
import { BorderedRectangle } from "../BorderedRectangle";
import { useDom } from "@/components/editor/hooks/useDom";

interface HoveredHightlightProps {
  hoveredNodeId: string;
}

const HoveredNodeToolComp: FC<HoveredHightlightProps> = ({ hoveredNodeId }) => {
  const { getDom } = useDom();

  const hoveredNodeDom = getDom(hoveredNodeId);

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    left: domLeft,
  } = hoveredNodeDom.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    zIndex: 1,
    left: domLeft,
  };

  return (
    <BorderedRectangle
      style={style}
      borderAttrs={{
        strokeDasharray: "4 4",
      }}
    />
  );
};

export const HoveredNodeTool = memo(HoveredNodeToolComp);
