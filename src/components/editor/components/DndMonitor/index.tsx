import { useDndMonitor } from "@dnd-kit/core";
import { observer } from "mobx-react-lite";

/** 用于检测各种拖拽事件，禁止在里头写操作or you will be fired */
export const DndMonitor = observer(() => {
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
    onDragCancel(id) {
      console.log(
        `Cancel: Dragging was cancelled. Draggable item ${id} was cancelled.`
      );
    },
  });

  return null;
});
