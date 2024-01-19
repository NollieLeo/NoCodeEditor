import { filter, map } from "lodash-es";
import { observer } from "mobx-react-lite";
import { memo, useMemo } from "react";
import { ClientRect } from "@dnd-kit/core";
import { useSnapPoints } from "@/components/editor/hooks/useSnapPoints";
import { DEFAULT_SVG_LINE_ATTRS } from "@/components/editor/components/Tools/components/SnapTools/constants/index";
import { SNAP_THRESHOLD } from "@/components/editor/constants";

interface SiblingsSnapLinesProps {
  parentId: string;
  id: string;
  rect: ClientRect;
  parentRect: DOMRect;
}

const SnapLinesComp = observer((props: SiblingsSnapLinesProps) => {
  const {
    id,
    rect: {
      left: dragLeft,
      right: dragRight,
      top: dragTop,
      bottom: dragBottom,
    },
    parentRect: {
      left: parentLeft,
      right: parentRight,
      top: parentTop,
      bottom: parentBottom,
    },
  } = props;

  const getSnapPoints = useSnapPoints();

  const snapPoints = useMemo(
    () => getSnapPoints(id),
    [getSnapPoints, id]
  );

  const renderLinesX = () => {
    const metPoints = filter(snapPoints.yPoints, (point) => {
      return (
        Math.abs(point - dragTop) <= SNAP_THRESHOLD ||
        Math.abs(point - dragBottom) <= SNAP_THRESHOLD
      );
    });
    if (!metPoints.length) {
      return <></>;
    }
    return map(metPoints, (yPoint) => (
      <line
        {...DEFAULT_SVG_LINE_ATTRS}
        key={yPoint}
        strokeDasharray={undefined}
        x1={parentLeft}
        x2={parentRight}
        y1={yPoint}
        y2={yPoint}
      />
    ));
  };

  const renderLinesY = () => {
    const metPoints = filter(snapPoints.xPoints, (point) => {
      return (
        Math.abs(point - dragRight) <= SNAP_THRESHOLD ||
        Math.abs(point - dragLeft) <= SNAP_THRESHOLD
      );
    });
    if (!metPoints.length) {
      return <></>;
    }
    return map(metPoints, (xPoint) => (
      <line
        {...DEFAULT_SVG_LINE_ATTRS}
        key={xPoint}
        strokeDasharray={undefined}
        x1={xPoint}
        x2={xPoint}
        y1={parentTop}
        y2={parentBottom}
      />
    ));
  };

  return (
    <>
      {renderLinesX()}
      {renderLinesY()}
    </>
  );
});

export const SiblingsSnapLines = memo(SnapLinesComp);
