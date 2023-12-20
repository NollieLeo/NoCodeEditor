import { useDndMonitor } from "@dnd-kit/core";
import { transaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useBoardContext } from "../../hooks/useBoardContext";
import { COMPONENTS_INFO } from "../../constants";
import { ComponentTypes } from "../../types";
import { uniqueId } from "lodash-es";

export const DndMonitor = observer(() => {
  const { boardStore } = useBoardContext();

  useDndMonitor({
    onDragStart({ active }) {
      const { id } = active;
      console.log(`Start: Picked up draggable item ${id}.`);
    },
    onDragMove({ active, over }) {
      const { id } = active;
      const overId = over?.id;

      if (overId) {
        console.log(
          `Move: Draggable item ${id} was moved over droppable area ${overId}.`
        );
        return;
      }

      console.log(
        `Move: Draggable item ${id} is no longer over a droppable area.`
      );
    },
    onDragOver({ over }) {
      if (over) {
        boardStore?.setOverNode(over);
      }
    },
    onDragEnd({ active, over }) {
      const { id, data } = active;
      const overId = over?.id;
      if (overId) {
        console.log(
          `End: Draggable item ${id} was dropped over droppable area ${overId}`
        );
        transaction(() => {
          if (data.current?.fromSidebar) {
            const { type } = data.current;
            const newNode = COMPONENTS_INFO[type as ComponentTypes];
            boardStore.createNewNode(
              {
                id: uniqueId(),
                type,
                data: newNode.defaultData,
                childNodes: [],
              },
              String(overId)
            );
          } else {
            boardStore.moveNodeTo(String(id), String(overId));
          }
          boardStore?.setOverNode(null);
        });
        return;
      }
      console.log(`End: Draggable item ${id} was dropped.`);
    },
    onDragCancel(id) {
      console.log(id);
      console.log(
        `Cancel: Dragging was cancelled. Draggable item ${id} was cancelled.`
      );
    },
  });

  return null;
});
