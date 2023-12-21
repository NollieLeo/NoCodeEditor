import { useBoardContext } from "@/components/editor/hooks/useBoardContext";
import { isNil } from "lodash-es";
import { memo } from "react";
import useToolWrapperRect from "../../hooks/useToolWrapperRect";
import { BorderedRectangle } from "../BorderedRectangle";
import { observer } from "mobx-react-lite";

const OverNodeToolComp = observer(() => {
  const { boardStore } = useBoardContext();

  const wrapperRect = useToolWrapperRect();

  const { id } = boardStore.overNode || {};

  const overDom = document.getElementById(String(id));

  if (!overDom || !wrapperRect || isNil(boardStore.panState)) {
    return <></>;
  }

  const {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    left: domLeft,
  } = overDom.getBoundingClientRect();

  const style = {
    width: domWidth,
    height: domHeight,
    top: domTop,
    bottom: domBottom,
    zIndex: 4,
    left: domLeft - wrapperRect.left,
  };

  return (
    <BorderedRectangle
      style={style}
      borderAttrs={{
        stroke: "red",
        strokeDasharray: "4 4",
      }}
    />
  );
});

export const OverNodeTool = memo(OverNodeToolComp);
