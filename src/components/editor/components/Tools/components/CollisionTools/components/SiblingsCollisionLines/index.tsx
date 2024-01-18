import { filter, map } from "lodash-es";
import { observer } from "mobx-react-lite";
import { memo, useMemo } from "react";
import { ClientRect } from "@dnd-kit/core";
import { useCollisionPoints } from "@/components/editor/hooks/useCollisionPoints";
import { DEFAULT_SVG_LINE_ATTRS } from "@/components/editor/components/Tools/components/CollisionTools/constants/index";

interface SiblingsCollisionLinesProps {
  parentId: string;
  id: string;
  rect: ClientRect;
  parentRect: DOMRect;
}

const CollisionLinesComp = observer((props: SiblingsCollisionLinesProps) => {
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

  const getCollisitionPoints = useCollisionPoints();

  const collisionPoints = useMemo(
    () => getCollisitionPoints(id),
    [getCollisitionPoints, id]
  );

  const renderLinesX = () => {
    const metPoints = filter(collisionPoints.yPoints, (point) => {
      const ceiledPoint = Math.floor(point);
      return (
        ceiledPoint === Math.floor(dragTop) ||
        ceiledPoint === Math.floor(dragBottom)
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
    const metPoints = filter(collisionPoints.xPoints, (point) => {
      const ceiledPoint = Math.floor(point);
      return (
        ceiledPoint === Math.floor(dragLeft) ||
        ceiledPoint === Math.floor(dragRight)
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

export const SiblingsCollisionLines = memo(CollisionLinesComp);
