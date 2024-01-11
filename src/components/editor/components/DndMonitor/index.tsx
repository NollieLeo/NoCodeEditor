import { useDndMonitor } from "@dnd-kit/core";

/** 用于检测各种拖拽事件，禁止在里头写操作 otherwise you will be fired */
export const DndMonitor = () => {
  useDndMonitor({
    onDragStart({ active }) {
      const { id } = active;
      console.log(`Start: Picked up draggable item ${id}.`);
    },
    onDragEnd({ over }) {
      console.log("End: End item", over);
    },
    onDragOver({ active, over }) {
      const { id } = active;
      const overId = over?.id;

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
    onDragMove(){
      // debugger
    },
    onDragCancel(id) {
      console.log(
        `Cancel: Dragging was cancelled. Draggable item ${id} was cancelled.`
      );
    },
  });

  return null;
};
