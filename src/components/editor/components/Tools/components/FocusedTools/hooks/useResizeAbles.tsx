import type { MoveableManagerInterface } from "react-moveable";
import { ResizeDimensionViewable } from "../components/ResizeDimensionViewable";

const DimensionViewable = {
  name: "dimensionViewable",
  props: [],
  events: [],
  render(moveable: MoveableManagerInterface<unknown, unknown>) {
    const rect = moveable.getRect();
    return <ResizeDimensionViewable rect={rect} />;
  },
} as const;

export default function useResizeAbles() {
  return {
    ables: [DimensionViewable],
    props: {
      dimensionViewable: true,
    },
  };
}
