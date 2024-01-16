import { FC, memo } from "react";
import { RectInfo } from "react-moveable";

interface ResizeDimensionViewableProps {
  rect: RectInfo;
}

const ResizeDimensionViewableComp: FC<ResizeDimensionViewableProps> = ({
  rect,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${rect.width / 2}px`,
        top: `${rect.height}px`,
        background: "#4af",
        borderRadius: "2px",
        padding: "2px 4px",
        color: "white",
        fontSize: "13px",
        whiteSpace: "nowrap",
        fontWeight: "bold",
        willChange: "transform",
        transform: `translate(-50%, 0px)`,
      }}
    >
      {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}
    </div>
  );
};

export const ResizeDimensionViewable = memo(ResizeDimensionViewableComp);
