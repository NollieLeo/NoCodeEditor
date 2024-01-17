import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { filter, forEach, map } from "lodash-es";
import { observer } from "mobx-react-lite";
import { memo, useMemo } from "react";
import { DEFAULT_SVG_LINE_ATTRS } from "@/components/editor/components/Tools/components/CollisionTools/constants/index";

interface SiblingsCollisionLinesProps {
  parentId: string;
  id: string;
  dragRect: DOMRect;
  parentRect: DOMRect;
}

const CollisionLinesComp = observer((props: SiblingsCollisionLinesProps) => {
  const {
    parentId,
    id,
    dragRect: {
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
  const {
    editorStore: { nodesMap },
  } = useEditorContext();

  const siblingIds = useMemo(() => {
    const { childNodes } = nodesMap[parentId];
    return filter(childNodes, (childId) => childId !== id);
  }, [id, nodesMap, parentId]);

  const siblingRects = useMemo(() => {
    return map(siblingIds, (id) => {
      const dom = document.getElementById(id);
      if (!dom) {
        throw new Error(`target dom :${id} does not exist`);
      }
      return dom.getBoundingClientRect();
    });
  }, [siblingIds]);

  const collisionPoints = useMemo(() => {
    const xPoints: number[] = [];
    const yPoints: number[] = [];
    forEach(siblingRects, ({ left, right, top, bottom }) => {
      xPoints.push(left);
      xPoints.push(right);
      yPoints.push(top);
      yPoints.push(bottom);
    });
    return { xPoints, yPoints };
  }, [siblingRects]);

  const renderLinesX = () => {
    const metPoints = filter(collisionPoints.yPoints, (point) => {
      const ceiledPoint = Math.ceil(point);
      return (
        ceiledPoint === Math.ceil(dragTop) ||
        ceiledPoint === Math.ceil(dragBottom)
      );
    });
    if (!metPoints.length) {
      return <></>;
    }
    return map(metPoints, (yPoint) => (
      <line
        {...DEFAULT_SVG_LINE_ATTRS}
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
      const ceiledPoint = Math.ceil(point);
      return (
        ceiledPoint === Math.ceil(dragLeft) ||
        ceiledPoint === Math.ceil(dragRight)
      );
    });
    if (!metPoints.length) {
      return <></>;
    }
    return map(metPoints, (xPoint) => (
      <line
        {...DEFAULT_SVG_LINE_ATTRS}
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
