import {
  useSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
} from "@dnd-kit/core";

export default function useEditorDndSensors() {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 0,
      delay: 300
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
      distance: 0,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return sensors;
}
