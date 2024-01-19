import { FC, SVGLineElementAttributes, memo } from "react";
import { DEFAULT_SVG_LINE_ATTRS, DISTANTCE_THRESHOLD } from "../../constants";

interface ParentSnapLinesProps {
  dragRect: DOMRect;
  parentRect: DOMRect;
}

const ParentSnapLinesComp: FC<ParentSnapLinesProps> = (props) => {
  const { dragRect, parentRect } = props;

  const curHorizontalCenter = dragRect.left + dragRect.width / 2;
  const curVerticalCenter = dragRect.top + dragRect.height / 2;
  const parentHorizontalCenter = parentRect.left + parentRect.width / 2;
  const parentVerticalCenter = parentRect.top + parentRect.height / 2;

  const renderLineY = () => {
    const isClosest =
      Math.abs(curHorizontalCenter - parentHorizontalCenter) <=
      DISTANTCE_THRESHOLD;

    if (!isClosest) {
      return <></>;
    }
    const leftLineAttrs: SVGLineElementAttributes<SVGLineElement> = {
      ...DEFAULT_SVG_LINE_ATTRS,
      strokeDasharray: undefined,
      x1: parentHorizontalCenter,
      x2: parentHorizontalCenter,
      y1: parentRect.top,
      y2: parentRect.top + parentRect.height,
    };
    return <line {...leftLineAttrs} />;
  };

  const renderLineX = () => {
    const isClosest =
      Math.abs(curVerticalCenter - parentVerticalCenter) <= DISTANTCE_THRESHOLD;

    if (!isClosest) {
      return <></>;
    }

    const leftLineAttrs: SVGLineElementAttributes<SVGLineElement> = {
      ...DEFAULT_SVG_LINE_ATTRS,
      strokeDasharray: undefined,
      x1: parentRect.left,
      x2: parentRect.left + parentRect.width,
      y1: parentVerticalCenter,
      y2: parentVerticalCenter,
    };
    return <line {...leftLineAttrs} />;
  };

  return (
    <>
      {renderLineY()}
      {renderLineX()}
    </>
  );
};

export const ParentSnapLines = memo(ParentSnapLinesComp);
