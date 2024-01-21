import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { useInsertTarget } from "@/components/editor/hooks/useInsertTarget";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragEndEvent } from "@dnd-kit/core";
import { createMeta } from "@/components/editor/utils/Meta";
import { genComponentInfo } from "@/components/editor/utils/Components";
import { useComponentInfo } from "@/components/editor/hooks/useComponentInfo";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { isAbsoluteOrFixed } from "@/components/editor/utils/layout";
import { getDomById } from "@/components/editor/utils/Dom";

export function useSideDnd() {
  const {
    editorStore,
    editorStore: { zoom },
  } = useEditorContext();
  const getInsertInfo = useInsertTarget();
  const { getComponentInfo } = useComponentInfo();

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      return;
    }
    const { data: newCompData } = active;
    const { data: dropCompData } = over;

    const { type } = newCompData.current as DragInfoFromSideAdd;
    const dropInfo = dropCompData.current! as DropInfo;

    const { id: parentId, scopeId, meta } = getComponentInfo(dropInfo.id);

    const {
      attrs: { style },
    } = COMPONENTS_INFO[type];

    if (isAbsoluteOrFixed(style)) {
      const parentDom = getDomById(parentId)!;
      const overlayDom = document.getElementById(String(active.id))!;

      const parentRect = parentDom.getBoundingClientRect();
      const overlayRect = overlayDom.getBoundingClientRect();

      const newStyle = {
        ...style,
        left: Math.floor((overlayRect.left - parentRect.left) / zoom),
        top: Math.floor((overlayRect.top - parentRect.top) / zoom),
      };

      const newMeta = createMeta({
        type,
        parentId: meta.id,
        attrs: { style: { ...newStyle } },
      });
      const newComponent = genComponentInfo(newMeta, scopeId);
      editorStore.addNode(newComponent, parentId);

    } else {
      const newMeta = createMeta({ type, parentId: meta.id });
      const newComponent = genComponentInfo(newMeta, scopeId);
      const insertInfo = getInsertInfo();
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
