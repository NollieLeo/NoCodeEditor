import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";

export default function useDndSensors() {
  const mouseSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 4,
    },
  });

  const sensors = useSensors(mouseSensor);

  return sensors;
}
