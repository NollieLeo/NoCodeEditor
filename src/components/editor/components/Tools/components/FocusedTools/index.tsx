import { FC, memo, useMemo } from "react";
import { EditorState } from "@/components/editor/stores/EditorStore";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import Moveable, { ResizableOptions } from "react-moveable";
import { flushSync } from "react-dom";
import useResizeTriggers from "./hooks/useResizeTriggers";
import "./index.scss";
import useResizeAbles from "./hooks/useResizeAbles";

interface FocusedToolsProps {
  focusedInfo: NonNullable<EditorState["focusedInfo"]>;
}

const FocusedToolsComp: FC<FocusedToolsProps> = observer(() => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const focusedTargetDom = document.getElementById(String(focusedInfo?.id));

  const { resizeKey, onResize, onResizeEnd } = useResizeTriggers(
    focusedInfo?.id
  );

  const { ables, props } = useResizeAbles();

  const resizableOptions = useMemo<ResizableOptions>(() => {
    return {
      renderDirections: ["nw", "ne", "sw", "se"],
      resizable: true,
      edge: ["n", "w", "s", "e"],
      throttleResize: 1,
    };
  }, []);

  return (
    <div className="focused-resize-wrapper">
      <Moveable
        flushSync={flushSync}
        key={resizeKey}
        target={focusedTargetDom}
        resizable={resizableOptions}
        props={props}
        ables={ables}
        linePadding={10}
        keepRatio={false}
        draggable={false}
        rotatable={false}
        origin={false}
        useResizeObserver
        onResize={onResize}
        onResizeEnd={onResizeEnd}
      />
    </div>
  );
});

export const FocusedTools = memo(FocusedToolsComp);
