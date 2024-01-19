import { FC, memo } from "react";
import { BorderedRectangle } from "../BorderedRectangle";
import { useGetElement } from "@/components/editor/hooks/useGetElement";

interface HoveredHightlightProps {
  hoveredNodeId: string;
}

const HoveredNodeToolComp: FC<HoveredHightlightProps> = ({ hoveredNodeId }) => {
  const { getElement } = useGetElement();

  const hoveredNodeDom = getElement(hoveredNodeId);

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
