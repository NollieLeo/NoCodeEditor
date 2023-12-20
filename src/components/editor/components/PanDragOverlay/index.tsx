import { DragOverlay } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { CSSProperties, FC, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { COMPONENTS_INFO } from "../../constants";
import { useBoardContext } from "../../hooks/useBoardContext";

const dragOverlayStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
};

export const PanDragOverlay: FC<{
  id?: string;
}> = observer((props) => {
  const { id } = props;
  const { boardStore } = useBoardContext();

  const activePanComp = useMemo(() => {
    if (id) {
      const { type } = boardStore.nodeMap[id];
      const { name } = COMPONENTS_INFO[type];
      return <span>{name}</span>;
    }
  }, [boardStore.nodeMap, id]);

  return (
    <DragOverlay
      dropAnimation={null}
      adjustScale={false}
      style={dragOverlayStyle}
      modifiers={[snapCenterToCursor]}
    >
      {activePanComp || <></>}
    </DragOverlay>
  );
});
