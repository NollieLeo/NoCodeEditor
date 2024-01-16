import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { isNil, uniqueId } from "lodash-es";
import { CSSProperties, useState } from "react";
import type { OnResize, OnResizeEnd } from "react-moveable";

function isAbsoluteOrFixed(dom?: HTMLElement | null) {
  if (!isNil(dom)) {
    return ["absolute", "fixed"].includes(dom.style.position);
  }
  return false;
}

export default function useFocusedResize(targetId?: string) {
  const { editorStore } = useEditorContext();
  const [resizeKey, setResizeKey] = useState(uniqueId());

  const forceResizeUpdate = () => {
    setResizeKey(uniqueId());
  };

  const onResize = (params: OnResize) => {
    if (!targetId) {
      return;
    }

    const { target, cssText, height, width } = params;
    const targetDom = document.getElementById(targetId);
    if (isAbsoluteOrFixed(targetDom)) {
      target.style.cssText += cssText;
    } else {
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
    }
    editorStore.setFocusedInfo({ id: targetId });
  };

  const onResizeEnd = (params: OnResizeEnd) => {
    if (!targetId) {
      return;
    }

    const { lastEvent, target } = params;
    const { width, height, direction, dist } = lastEvent;
    target.style.transform = "";
    forceResizeUpdate();
    editorStore.updateNodeStyle(({ top: preTop, left: preLeft }) => {
      const updatedStyle: CSSProperties = {
        width,
        height,
      };
      if (!isNil(preTop) && !isNil(preLeft)) {
        updatedStyle.top =
          direction[1] === -1 ? Number(preTop) - dist[1] : preTop;
        updatedStyle.left =
          direction[0] === -1 ? Number(preLeft) - dist[0] : preLeft;
      }
      return updatedStyle;
    }, targetId);
  };

  return {
    resizeKey,
    onResize,
    onResizeEnd,
  };
}
