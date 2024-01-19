import { FC, memo, useMemo, useRef } from "react";
import { EditorState } from "@/components/editor/stores/EditorStore";
import Moveable, { ResizableOptions } from "react-moveable";
import { flushSync } from "react-dom";
import useResizeTriggers from "./hooks/useResizeTriggers";
import "./index.scss";
import useResizeAbles from "./hooks/useResizeAbles";
import { useSnapPoints } from "@/components/editor/hooks/useSnapPoints";
import { SNAP_THRESHOLD } from "@/components/editor/constants";
import useGetSiblings from "@/components/editor/hooks/useGetSiblings";
import { map } from "lodash-es";

interface FocusedToolsProps {
  focusedInfo: NonNullable<EditorState["focusedInfo"]>;
}

const FocusedToolsComp: FC<FocusedToolsProps> = ({ focusedInfo }) => {
  const { resizeKey, onResize, onResizeEnd } = useResizeTriggers(
    focusedInfo.id
  );

  const moveableRef = useRef<Moveable>(null);

  const getSnapPoints = useSnapPoints();

  const getSiblingIds = useGetSiblings();

  const { ables, props } = useResizeAbles();

  const snapPoints = useMemo(
    () => getSnapPoints(focusedInfo.id),
    [focusedInfo.id, getSnapPoints]
  );

  const siblingIds = useMemo(() => {
    return getSiblingIds(focusedInfo.id);
  }, [focusedInfo.id, getSiblingIds]);

  const resizableOptions = useMemo<ResizableOptions>(() => {
    return {
      renderDirections: ["nw", "ne", "sw", "se"],
      resizable: true,
      edge: ["n", "w", "s", "e"],
      throttleResize: 1,
      keepRatio: false,
    };
  }, []);

  return (
    <div className="focused-resize-wrapper">
      <Moveable
        ref={moveableRef}
        key={`${resizeKey}`}
        flushSync={flushSync}
        target={[`#${focusedInfo?.id}`]}
        resizable={resizableOptions}
        props={props}
        ables={ables}
        linePadding={10}
        dragTargetSelf
        draggable={false}
        rotatable={false}
        origin={false}
        useResizeObserver
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        snappable
        snapThreshold={SNAP_THRESHOLD}
        horizontalGuidelines={snapPoints.yPoints}
        verticalGuidelines={snapPoints.xPoints}
        elementSnapDirections={{
          top: true,
          left: true,
          bottom: true,
          right: true,
          center: true,
          middle: true,
        }}
        elementGuidelines={map(siblingIds, (id) => `#${id}`)}
        maxSnapElementGuidelineDistance={50}
      />
    </div>
  );
};

export const FocusedTools = memo(FocusedToolsComp);
