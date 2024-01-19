import { FC, memo, useMemo } from "react";
import { EditorState } from "@/components/editor/stores/EditorStore";
import Moveable, { ResizableOptions } from "react-moveable";
import { flushSync } from "react-dom";
import useResizeTriggers from "./hooks/useResizeTriggers";
import "./index.scss";
import useResizeAbles from "./hooks/useResizeAbles";
import { useSnapPoints } from "@/components/editor/hooks/useSnapPoints";
import { SNAP_THRESHOLD } from "@/components/editor/constants";

interface FocusedToolsProps {
  focusedInfo: NonNullable<EditorState["focusedInfo"]>;
}

const FocusedToolsComp: FC<FocusedToolsProps> = ({ focusedInfo }) => {
  const { resizeKey, onResize, onResizeEnd } = useResizeTriggers(
    focusedInfo.id
  );

  const getSnapPoints = useSnapPoints();

  const { ables, props } = useResizeAbles();

  const snapPoints = useMemo(
    () => getSnapPoints(focusedInfo.id),
    [focusedInfo.id, getSnapPoints]
  );

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
        key={resizeKey}
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
      />
    </div>
  );
};

export const FocusedTools = memo(FocusedToolsComp);
