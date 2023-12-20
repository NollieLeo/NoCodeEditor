import { FC, memo, useMemo } from "react";
import { ComponentTypes } from "../../types";
import { COMPONENTS_INFO } from "../../constants";

export const SiderBarDragOverlayComp: FC<{
  type?: ComponentTypes;
}> = memo((props) => {
  const { type } = props;

  const activeSiderBarComp = useMemo(() => {
    if (type) {
      const { name } = COMPONENTS_INFO[type];
      return <span>{name}</span>;
    }
  }, [type]);

  return activeSiderBarComp || <></>;
});
