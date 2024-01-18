import { useDndMonitor } from "@dnd-kit/core";
import useEditorDnd from "./hooks";
import { observer } from "mobx-react-lite";

export const DndMonitor = observer(() => {
  const dndConfig = useEditorDnd();
  useDndMonitor(dndConfig);
  return null;
});
