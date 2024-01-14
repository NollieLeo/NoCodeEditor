import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { SchemaData } from "@/components/editor/types";
import { isNil } from "lodash-es";
import { observer } from "mobx-react-lite";
import { CSSProperties, SVGLineElementAttributes, memo, useMemo } from "react";

const CLOSE_THRESHOLD = 20;

const RectHighlightTmpl = observer(() => {
  const {
    editorStore: { nodesMap, focusedInfo, draggingInfo },
  } = useEditorContext();

  const nodeHasParentSchema = useMemo(() => {
    const targetId = draggingInfo?.id || focusedInfo?.id;
    if (isNil(targetId)) {
      return null;
    }
    const target = nodesMap[targetId];
    if (
      isNil(target?.parentId) ||
      (target.data.style.position !== "fixed" &&
        target.data.style.position !== "absolute")
    ) {
      return null;
    }
    return target as { parentId: string } & SchemaData;
  }, [draggingInfo?.id, focusedInfo?.id, nodesMap]);

  if (!nodeHasParentSchema) {
    return <></>;
  }

  const { parentId, id } = nodeHasParentSchema;

  const parentRect = document.getElementById(parentId)?.getBoundingClientRect();
  const curRect = document.getElementById(id)?.getBoundingClientRect();

  if (!parentRect || !curRect) {
    return <></>;
  }

  const defaultLineProps: SVGLineElementAttributes<SVGLineElement> = {
    strokeWidth: 1,
    strokeLinecap: "square",
    stroke: "red",
    strokeDasharray: "4 4",
  };

  const curHorizontalCenter = curRect.left + curRect.width / 2;
  const curVerticalCenter = curRect.top + curRect.height / 2;
  const parentHorizontalCenter = parentRect.left + parentRect.width / 2;
  const parentVerticalCenter = parentRect.top + parentRect.height / 2;

  const renderTopLine = () => {
    const isOutOfBound =
      curHorizontalCenter >= parentRect.right ||
      curRect.top <= parentRect.top ||
      curRect.top >= parentRect.bottom - curRect.height;
    if (isOutOfBound) {
      return null;
    }
    const topLineProps: SVGLineElementAttributes<SVGLineElement> = {
      ...defaultLineProps,
      x1: curHorizontalCenter,
      x2: curHorizontalCenter,
      y1: parentRect.top,
      y2: curRect.top,
    };
    return <line {...topLineProps} />;
  };

  const renderLeftLine = () => {
    const isOutOfBound =
      curVerticalCenter >= parentRect.bottom || curRect.left <= parentRect.left;
    curRect.left >= Math.abs(parentRect.right - curRect.width);
    if (isOutOfBound) {
      return <></>;
    }
    const leftLineProps: SVGLineElementAttributes<SVGLineElement> = {
      ...defaultLineProps,
      x1: parentRect.left,
      x2: curRect.left,
      y1: curVerticalCenter,
      y2: curVerticalCenter,
    };
    return <line {...leftLineProps} />;
  };

  const renderParentVerticalLine = () => {
    const isClosest =
      Math.abs(curHorizontalCenter - parentHorizontalCenter) <= CLOSE_THRESHOLD;
    if (!isClosest || !draggingInfo) {
      return <></>;
    }
    const leftLineProps: SVGLineElementAttributes<SVGLineElement> = {
      ...defaultLineProps,
      strokeDasharray: undefined,
      x1: parentHorizontalCenter,
      x2: parentHorizontalCenter,
      y1: parentRect.top,
      y2: parentRect.top + parentRect.height,
    };
    return <line {...leftLineProps} />;
  };

  const renderParentHorizontalLine = () => {
    const isClosest =
      Math.abs(curVerticalCenter - parentVerticalCenter) <= CLOSE_THRESHOLD;
    if (!isClosest || !draggingInfo) {
      return <></>;
    }
    const leftLineProps: SVGLineElementAttributes<SVGLineElement> = {
      ...defaultLineProps,
      strokeDasharray: undefined,
      x1: parentRect.left,
      x2: parentRect.left + parentRect.width,
      y1: parentVerticalCenter,
      y2: parentVerticalCenter,
    };
    return <line {...leftLineProps} />;
  };

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    width: '100vw',
    height: '100vh'
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={wrapperStyle}>
      {renderTopLine()}
      {renderLeftLine()}
      {renderParentVerticalLine()}
      {renderParentHorizontalLine()}
    </svg>
  );
});

export const RectHighlight = memo(RectHighlightTmpl);
