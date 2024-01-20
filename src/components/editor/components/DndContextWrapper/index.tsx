import { DndContext } from "@dnd-kit/core";
import { FC, PropsWithChildren } from "react";
import { useCollisionDetection } from "./hooks/useCollisionDetection";
import { useDndMeasuring } from "./hooks/useDndMeasuring";
import useDndModifiers from "./hooks/useDndModifiers";
import useDndSensors from "./hooks/useDndSensors";
import { observer } from "mobx-react-lite";

export const DndContextWrapper: FC<PropsWithChildren> = observer((props) => {
  const { children } = props;
  const sensors = useDndSensors();
  const modifiers = useDndModifiers();
  const measuring = useDndMeasuring();
  const editorCollisionDetection = useCollisionDetection();
  return (
    <DndContext
      sensors={sensors}
      measuring={measuring}
      modifiers={modifiers}
      collisionDetection={editorCollisionDetection}
    >
      {children}
    </DndContext>
  );
});
