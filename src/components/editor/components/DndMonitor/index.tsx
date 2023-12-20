import { useDndMonitor } from "@dnd-kit/core";
import { observer } from "mobx-react-lite";
import { useBoardContext } from "../../hooks/useBoardContext";

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
    onDragOver({ active, over }) {
      const { id } = active;
      const overId = over?.id;
      if (over) {
        boardStore?.setOverNode(over);
      }

      if (overId) {
        console.log(
          `Over: Draggable item ${id} was moved over droppable area ${overId}.`
        );
        return;
      }

      console.log(
        `Over: Draggable item ${id} is no longer over a droppable area.`
      );
    },
    onDragEnd({ active, over }) {
      const { id } = active;
      const overId = over?.id;

      if (overId) {
        console.log(
          `End: Draggable item ${id} was dropped over droppable area ${overId}`
        );
        // boardStore?.setOverNode(null);
        // debugger
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
