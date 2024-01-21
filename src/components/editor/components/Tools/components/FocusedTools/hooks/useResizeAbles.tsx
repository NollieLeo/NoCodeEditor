import type { MoveableManagerInterface } from "react-moveable";
import { ResizeDimensionViewable } from "../components/ResizeDimensionViewable";
import { ComponentNameTag } from "../components/ComponentName";

const DimensionViewable = {
  name: "dimensionViewable",
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<unknown, unknown>) {
    const rect = moveable.getRect();
    return <ResizeDimensionViewable key={"dimensionViewable"} rect={rect} />;
  },
} as const;

const ComponentNameTagView = {
  name: "componentName",
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<unknown, unknown>) {
    const rect = moveable.getRect();
    return <ComponentNameTag key="componentName" rect={rect} />;
  },
} as const;

export default function useResizeAbles() {
  return {
    ables: [DimensionViewable, ComponentNameTagView],
    props: {
      dimensionViewable: true,
      componentName: true,
    },
  };
}
