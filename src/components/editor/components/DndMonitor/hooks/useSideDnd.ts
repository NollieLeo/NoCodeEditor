import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { useInsertTarget } from "@/components/editor/hooks/useInsertTarget";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragEndEvent } from "@dnd-kit/core";
import { createMeta } from "@/components/editor/utils/Meta";
import { genComponentInfo } from "@/components/editor/utils/Components";
import { useComponentInfo } from "@/components/editor/hooks/useComponentInfo";

export function useSideDnd() {
  const { editorStore } = useEditorContext();
  const getInsertInfo = useInsertTarget();
  const { getComponentInfo } = useComponentInfo();

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    const { type } = active.data.current as DragInfoFromSideAdd;
    const dropInfo = over?.data.current as DropInfo;
    const insertInfo = getInsertInfo();

    if (dropInfo) {
      const { id: parentId, scopeId, meta } = getComponentInfo(dropInfo.id);

      const newMeta = createMeta({ type, parentId: meta.id });
      const newComponent = genComponentInfo(newMeta, scopeId);
      editorStore.addNode(newComponent, parentId, insertInfo?.insertIdx);
      requestIdleCallback(() => {
        editorStore.setFocusedInfo({ id: newComponent.id });
      });
    }
  };

  return {
    onDragEnd,
  };
}
