import { map } from "lodash-es";
import { flushSync } from "react-dom";
import { observer } from "mobx-react-lite";
import { FC, memo, useMemo, useRef } from "react";
import useResizeAbles from "./hooks/useResizeAbles";
import useResizeTriggers from "./hooks/useResizeTriggers";
import Moveable, { ResizableOptions } from "react-moveable";
import { useSnapPoints } from "@/components/editor/hooks/useSnapPoints";
import { EditorState } from "@/components/editor/stores/EditorStore";
import { SNAP_THRESHOLD } from "@/components/editor/constants";
import { useGetComponentId } from "@/components/editor/hooks/useGetComponentId";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";

import "./index.scss";
import { useDom } from "@/components/editor/hooks/useDom";

interface FocusedToolsProps {
  focusedInfo: NonNullable<EditorState["focusedInfo"]>;
}

const FocusedToolsComp: FC<FocusedToolsProps> = observer(() => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const moveableRef = useRef<Moveable>(null);

  const getSnapPoints = useSnapPoints();

  const { getSiblingIds } = useGetComponentId();

  const { ables, props } = useResizeAbles();
  const { resizeKey, onResize, onResizeEnd } = useResizeTriggers(
    focusedInfo?.id
  );

  const { getDom } = useDom();

  const snapPoints = useMemo(
    () => (focusedInfo?.id ? getSnapPoints(focusedInfo?.id) : null),
    [focusedInfo?.id, getSnapPoints]
  );

  const siblingIds = useMemo(() => {
    return focusedInfo?.id ? getSiblingIds(focusedInfo?.id) : [];
  }, [focusedInfo?.id, getSiblingIds]);

  const resizableOptions = useMemo<ResizableOptions>(() => {
    return {
      renderDirections: ["nw", "ne", "sw", "se"],
      resizable: true,
      edge: ["n", "w", "s", "e"],
      throttleResize: 1,
      keepRatio: false,
    };
  }, []);

  const horizontalGuidelines = useMemo(() => {
    return snapPoints ? snapPoints.yPoints : [];
  }, [snapPoints]);

  const verticalGuidelines = useMemo(() => {
    return snapPoints ? snapPoints.xPoints : [];
  }, [snapPoints]);

  if (!focusedInfo?.id) {
    return <></>;
  }

  return (
    <div className="focused-resize-wrapper">
      <Moveable
        ref={moveableRef}
        key={resizeKey}
        target={getDom(focusedInfo?.id)}
        resizable={resizableOptions}
        props={props}
        ables={ables}
        linePadding={10}
        dragTargetSelf
        rotatable={false}
        origin={false}
        useResizeObserver
        snappable
        snapThreshold={SNAP_THRESHOLD}
        horizontalGuidelines={horizontalGuidelines}
        verticalGuidelines={verticalGuidelines}
        elementSnapDirections={{
          top: true,
          left: true,
          bottom: true,
          right: true,
          center: true,
          middle: true,
        }}
        elementGuidelines={map(siblingIds, (id) => getDom(id))}
        maxSnapElementGuidelineDistance={50}
        flushSync={flushSync}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
      />
    </div>
  );
});

export const FocusedTools = memo(FocusedToolsComp);
