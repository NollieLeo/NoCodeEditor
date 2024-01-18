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

export default function useResizeTriggers(targetId?: string) {
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
    const { lastEvent, target } = params;
    target.style.transform = "";
    forceResizeUpdate();
    if (!targetId || !lastEvent) {
      return;
    }
    const { width, height, direction, dist, target: targetDom } = lastEvent;

    const updatedStyle: CSSProperties = {
      width,
      height,
    };
    if (isAbsoluteOrFixed(targetDom)) {
      updatedStyle.top =
        direction[1] === -1
          ? targetDom.offsetTop - dist[1]
          : targetDom.offsetTop;
      updatedStyle.left =
        direction[0] === -1
          ? targetDom.offsetLeft - dist[0]
          : targetDom.offsetLeft;
    }

    editorStore.updateNodeStyle(updatedStyle, targetId);
  };

  return {
    resizeKey,
    onResize,
    onResizeEnd,
  };
}
