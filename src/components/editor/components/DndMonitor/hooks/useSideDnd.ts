import { DragInfoFromSideAdd, DropInfo } from "@/components/editor/types";
import { useInsertTarget } from "@/components/editor/hooks/useInsertTarget";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragEndEvent } from "@dnd-kit/core";
import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { isAbsoluteOrFixed } from "@/components/editor/utils/layout";
import { getDomById, getDomByOverlayId } from "@/components/editor/utils/Dom";
import { useEditorTriggers } from "@/components/editor/hooks/useEditorTriggers";
import { CSSProperties } from "react";
import { isNil } from "lodash-es";
import { useSelectComponent } from "@/components/editor/hooks/useSelectComponent";

export function useSideDnd() {
  const {
    editorStore: { zoom, positonMode },
  } = useEditorContext();
  const getInsertInfo = useInsertTarget();
  const { getComponentInfo } = useGetComponentInfo();
  const { onAdd } = useEditorTriggers();
  const { onSelectComponent } = useSelectComponent();

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      return;
    }
    const { data: newCompData } = active;
    const { data: dropCompData } = over;

    const { type } = newCompData.current as DragInfoFromSideAdd;
    const dropInfo = dropCompData.current! as DropInfo;

    const { id: parentId, scopeId, metaId } = getComponentInfo(dropInfo.id);

    let style: CSSProperties = {};
    let insertIdx: number | undefined;
    if (isAbsoluteOrFixed({ position: positonMode })) {
      const parentRect = getDomById(parentId)!.getBoundingClientRect();
      const overlayRect = getDomByOverlayId(active.id)!.getBoundingClientRect();
      style = {
        left: Math.floor((overlayRect.left - parentRect.left) / zoom),
        top: Math.floor((overlayRect.top - parentRect.top) / zoom),
        position: positonMode,
      };
    } else {
      const insertInfo = getInsertInfo();
      if (!isNil(insertInfo)) {
        insertIdx = insertInfo.insertIdx;
      }
    }

    const {
      components: [rootComponent],
    } = onAdd(
      {
        type,
        parentId: metaId,
        attrs: { style },
      },
      scopeId,
      insertIdx
    );

    onSelectComponent(rootComponent.id);
  };

  return {
    onDragEnd,
  };
}
