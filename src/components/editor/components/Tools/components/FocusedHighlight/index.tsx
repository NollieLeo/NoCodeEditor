import { CSSProperties, FC, memo, useMemo } from "react";
import { EditorState } from "@/components/editor/stores/EditorStore";
import { Resizable, ResizeCallback } from "re-resizable";
import "./index.scss";
import { forEach, values } from "lodash-es";
import { ResizePositions } from "./types";
import classNames from "classnames";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";

interface FocusedHighlightProps {
  focusedInfo: NonNullable<EditorState["focusedInfo"]>;
}

const FocusedHighlightComp: FC<FocusedHighlightProps> = observer(
  ({ focusedInfo }) => {
    const {
      editorStore,
      editorStore: { panState },
    } = useEditorContext();
    if (!panState || !focusedInfo) {
      throw new Error("no focused node or pan state never initialized");
    }

    const activeNodeDom = document.getElementById(String(focusedInfo?.id));
    const domRect = activeNodeDom?.getBoundingClientRect();
    const { width = 0, height = 0, top = 0, left = 0 } = domRect || {};
    const resizePositions = useMemo(() => values(ResizePositions), []);

    const resizeHandleClasses = useMemo(() => {
      const handleClassRecord: Record<string, string> = {};
      forEach(resizePositions, (position) => {
        handleClassRecord[position] = classNames(
          "focused-resize-handle",
          position
        );
      });
      return handleClassRecord;
    }, [resizePositions]);

    const resizeSize = useMemo(() => {
      return {
        width,
        height,
      };
    }, [height, width]);

    const resizeWrapStyle: CSSProperties = { top, left };

    const onResizeStop: ResizeCallback = (_e, _direction, _ref, d) => {
      editorStore.updateNodeStyle(
        {
          width: (width + d.width) / panState.scale,
          height: (height + d.height) / panState.scale,
        },
        focusedInfo.id
      );
      requestIdleCallback(() => {
        editorStore.setFocusedInfo({ id: focusedInfo.id });
      });
    };

    return (
      <Resizable
        key={focusedInfo.id}
        style={resizeWrapStyle}
        defaultSize={resizeSize}
        onResizeStop={onResizeStop}
        className="focused-resize"
        handleWrapperClass="focused-resize-handles"
        handleClasses={resizeHandleClasses}
      />
    );
  }
);

export const FocusedHighlight = memo(FocusedHighlightComp);
