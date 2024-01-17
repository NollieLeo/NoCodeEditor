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
      key={"dimension-viewer"}
      style={{
        position: "absolute",
        left: `${rect.width / 2}px`,
        top: `${rect.height + 2}px`,
        background: "#1450d9",
        borderRadius: 5,
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
