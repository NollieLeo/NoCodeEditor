import { FC, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

import { COMPONENTS_INFO } from "../../constants";
import { useBoardContext } from "../../hooks/useBoardContext";

export const PanDragOverlay: FC<{
  id?: string;
}> = observer((props) => {
  const { id } = props;
  const { boardStore } = useBoardContext();

  const activePanComp = useMemo(() => {
    if (id && boardStore.nodeMap[id]) {
      const { type } = toJS(boardStore.nodeMap[id]);
      const { name } = COMPONENTS_INFO[type];
      return <span>{name}</span>;
    }
  }, [boardStore.nodeMap, id]);

  if (!id || !boardStore.nodeMap[id]) {
    return <></>;
  }

  return activePanComp || <></>;
});
