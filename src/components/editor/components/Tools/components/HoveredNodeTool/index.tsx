import { useBoardContext } from "@/components/editor/hooks/useBoardContext";
import { memo } from "react";
import useToolWrapperRect from "../../hooks/useToolWrapperRect";
import { isNil } from "lodash-es";
import { BorderedRectangle } from "../BorderedRectangle";
import { observer } from "mobx-react-lite";

const HoveredNodeToolComp = observer(() => {
  const { boardStore } = useBoardContext();
  const wrapperRect = useToolWrapperRect();

  const hoveredNodeDom = document.getElementById(
    String(boardStore.hoveredNodeId)
  );

  if (!hoveredNodeDom || !wrapperRect || isNil(boardStore.panState)) {
    return <></>;
  }

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    left: domLeft,
  } = hoveredNodeDom.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    zIndex: 3,
    left: domLeft - wrapperRect.left,
  };

  return (
    <BorderedRectangle
      style={style}
      borderAttrs={{
        strokeDasharray: "4 4",
      }}
    />
  );
});

export const HoveredNodeTool = memo(HoveredNodeToolComp);
