import { useDom } from "@/components/editor/hooks/useDom";
import { isNil, uniqueId } from "lodash-es";
import { CSSProperties, useState } from "react";
import type { OnResize, OnResizeEnd } from "react-moveable";
import { useEditorTriggers } from "@/components/editor/hooks/useEditorTriggers";

function isAbsoluteOrFixed(dom?: HTMLElement | null) {
  if (!isNil(dom)) {
    return ["absolute", "fixed"].includes(dom.style.position);
  }
  return false;
}

export default function useResizeTriggers(targetId?: string) {
  const [resizeKey, setResizeKey] = useState(uniqueId());
  const { onUpdateAttrByCompId } = useEditorTriggers();
  const { getDom } = useDom();

  const forceResizeUpdate = () => {
    setResizeKey(uniqueId());
  };

  const onResize = (params: OnResize) => {
    if (!targetId) {
      return;
    }
    const { target, cssText, height, width } = params;
    const targetDom = getDom(targetId);

    if (isAbsoluteOrFixed(targetDom)) {
      target.style.cssText += cssText;
    } else {
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
    }
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

    onUpdateAttrByCompId(targetId, "style", updatedStyle);
  };

  return {
    resizeKey,
    forceResizeUpdate,
    onResize,
    onResizeEnd,
  };
}
