import { useDroppable } from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC, ReactNode, useMemo } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import {
  DragInfoFromPanSort,
  DragOrigin,
  DropInfo,
} from "@/components/editor/types";

import "./index.scss";

export interface CompWrapperProps {
  droppable?: boolean;
  itemIds?: string[];
  draggable?: boolean;
  id: string;
  parentId?: string | null;
  children: (params: any) => ReactNode;
}

export const CompWrapper: FC<CompWrapperProps> = observer((props) => {
  const {
    children,
    droppable = true,
    draggable = true,
    id,
    parentId,
    itemIds,
  } = props;
  const { editorStore } = useEditorContext();

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id,
    disabled: !draggable,
    data: {
      id,
      parentId,
      from: DragOrigin.PAN_SORT,
    } as DragInfoFromPanSort,
  });

  const isDroppableDisabled = useMemo(() => {
    console.log("itemIds", itemIds);
    return isDragging || !itemIds;
  }, [isDragging, itemIds]);

  const { setNodeRef: setDropRef } = useDroppable({
    id,
    disabled: isDroppableDisabled,
    data: {
      id,
      parentId,
    } as DropInfo,
  });

  const sortableItemTransform = useMemo(() => {
    if (transform) {
      const { x, y } = transform;
      const panScale = editorStore.panState?.scale || 1;
      const proportion = 1 / panScale;
      const realX = x * proportion;
      const realY = y * proportion;
      return CSS.Transform.toString({ ...transform, x: realX, y: realY });
    }
  }, [editorStore.panState?.scale, transform]);

  const sortItemStyle = {
    transform: sortableItemTransform,
    transition,
  };

  const dropZoomCls = classNames("editor-dropzoom");

  const onClick = (e: Event) => {
    e.stopPropagation();
    editorStore.setFocusedNodeId(id);
  };

  const onMouseOver = (e: Event) => {
    e.stopPropagation();
    editorStore.setHoverNodeId(id);
  };

  const onMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    editorStore.setHoverNodeId(null);
  };

  const genComps = children({
    ...attributes,
    ...listeners,
    id,
    style: sortItemStyle,
    className: dropZoomCls,
    ref(nodeRef: any) {
      setDragRef(nodeRef);
      setDropRef(nodeRef);
    },
    onClick,
    onMouseOver,
    onMouseLeave,
  });

  return droppable ? (
    <SortableContext
      id={id}
      items={itemIds || []}
      strategy={verticalListSortingStrategy}
    >
      {genComps}
    </SortableContext>
  ) : (
    genComps
  );
});
