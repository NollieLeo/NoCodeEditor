import type { MoveableManagerInterface } from "react-moveable";
import { ResizeDimensionViewable } from "../components/ResizeDimensionViewable";
import { ComponentNameTag } from "../components/ComponentName";
import { ComponentOperations } from "../components/ComponentOperations";

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
  render() {
    return <ComponentNameTag key="componentName" />;
  },
} as const;

const ComponentOperationsView = {
  name: "componentOperations",
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<unknown, unknown>) {
    const rect = moveable.getRect();
    return <ComponentOperations key="componentOperations" rect={rect} />;
  },
} as const;

export default function useResizeAbles() {
  return {
    ables: [DimensionViewable, ComponentNameTagView, ComponentOperationsView],
    props: {
      dimensionViewable: true,
      componentName: true,
      componentOperations: true,
    },
  };
}
