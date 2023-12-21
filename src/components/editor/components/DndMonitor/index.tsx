import { useDndMonitor } from "@dnd-kit/core";
import { observer } from "mobx-react-lite";

/** 用于检测各种拖拽事件，禁止在里头写操作 otherwise you will be fired */
export const DndMonitor = observer(() => {
  useDndMonitor({
    onDragStart({ active }) {
      const { id } = active;
      console.log(`Start: Picked up draggable item ${id}.`);
    },
    onDragCancel(id) {
      console.log(
        `Cancel: Dragging was cancelled. Draggable item ${id} was cancelled.`
      );
    },
  });

  return null;
});
