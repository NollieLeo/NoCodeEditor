import { SVGLineElementAttributes, memo } from "react";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DEFAULT_SVG_LINE_ATTRS } from "@/components/editor/components/Tools/components/CollisionTools/constants";

interface DraggingGuildLinesProps {
  dragRect: DOMRect;
  parentRect: DOMRect;
}

const DraggingGuildLinesComp = observer((props: DraggingGuildLinesProps) => {
  const { dragRect, parentRect } = props;
  const {
    editorStore: {
      panState: { scale },
    },
  } = useEditorContext();

  const curHorizontalCenter = dragRect.left + dragRect.width / 2;
  const curVerticalCenter = dragRect.top + dragRect.height / 2;

  const renderLineY = () => {
    const isOutOfBound =
      curHorizontalCenter >= parentRect.right ||
      curHorizontalCenter <= parentRect.left ||
      dragRect.top <= parentRect.top ||
      dragRect.top >= parentRect.bottom;

    if (isOutOfBound) {
      return null;
    }

    const topLineProps: SVGLineElementAttributes<SVGLineElement> = {
      ...DEFAULT_SVG_LINE_ATTRS,
      x1: curHorizontalCenter,
      x2: curHorizontalCenter,
      y1: parentRect.top,
      y2: dragRect.top,
    };

    const realDist = Math.ceil((dragRect.top - parentRect.top) / scale);

    return (
      <>
        <line {...topLineProps} />
        <text
          x={curHorizontalCenter}
          y={(dragRect.top - parentRect.top) / 2 + parentRect.top}
          fill="red"
        >
          {realDist}
        </text>
      </>
    );
  };

  const renderLineX = () => {
    const isOutOfBound =
      curVerticalCenter >= parentRect.bottom ||
      curVerticalCenter <= parentRect.top ||
      dragRect.left <= parentRect.left ||
      dragRect.left >= parentRect.right;

    if (isOutOfBound) {
      return <></>;
    }

    const leftLineProps: SVGLineElementAttributes<SVGLineElement> = {
      ...DEFAULT_SVG_LINE_ATTRS,
      x1: parentRect.left,
      x2: dragRect.left,
      y1: curVerticalCenter,
      y2: curVerticalCenter,
    };

    const realDist = Math.ceil((dragRect.left - parentRect.left) / scale);

    return (
      <>
        <line {...leftLineProps} />;
        <text
          x={(dragRect.left - parentRect.left) / 2 + parentRect.left}
          y={curVerticalCenter}
          fill="red"
        >
          {realDist}
        </text>
      </>
    );
  };

  return (
    <>
      {renderLineY()}
      {renderLineX()}
    </>
  );
});

export const DraggingGuildLines = memo(DraggingGuildLinesComp);
