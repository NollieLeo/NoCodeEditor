import type { MoveableManagerInterface } from "react-moveable";
import { ResizeDimensionViewable } from "../components/ResizeDimensionViewable";
import { ComponentNameTag } from "../components/ComponentName";
import { ComponentOperations } from "../components/ComponentOperations";
import { OPERATIONAL_COMPONENTS } from "../constants";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { getTypeByDomId } from "@/components/editor/utils/Dom";
import { useMemo } from "react";

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
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();
  const operational = OPERATIONAL_COMPONENTS.includes(
    getTypeByDomId(focusedInfo!.id)
  );

  const ables = useMemo(() => {
    const defaultAbles = [
      DimensionViewable,
      ComponentNameTagView,
      ComponentOperationsView,
    ];
    if (operational) {
      defaultAbles.push(ComponentOperationsView);
    }
    return defaultAbles;
  }, [operational]);

  return {
    ables: ables,
    props: {
      dimensionViewable: true,
      componentName: true,
      componentOperations: operational,
    },
  };
}
