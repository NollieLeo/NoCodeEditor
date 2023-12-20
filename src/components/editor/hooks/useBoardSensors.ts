import {
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
} from "@dnd-kit/core";

export default function useBoardSensors() {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 4,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return sensors;
}
