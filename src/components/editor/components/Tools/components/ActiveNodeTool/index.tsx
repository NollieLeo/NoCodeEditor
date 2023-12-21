import { memo } from "react";
import { BorderedRectangle } from "../BorderedRectangle";
import { observer } from "mobx-react-lite";
import { useBoardContext } from "@/components/editor/hooks/useBoardContext";
import { isNil } from "lodash-es";
import useToolWrapperRect from "../../hooks/useToolWrapperRect";

const ActiveNodeToolComp = observer(() => {
  const { boardStore } = useBoardContext();
  const activeNodeDom = document.getElementById(
    String(boardStore.activeNodeId)
  );

  const wrapperRect = useToolWrapperRect();

  if (!activeNodeDom || !wrapperRect || isNil(boardStore.panState)) {
    return <></>;
  }

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    left: domLeft,
  } = activeNodeDom.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    zIndex: 2,
    left: domLeft - wrapperRect.left,
  };

  return <BorderedRectangle style={style} />;
});

export const ActiveNodeTool = memo(ActiveNodeToolComp);
