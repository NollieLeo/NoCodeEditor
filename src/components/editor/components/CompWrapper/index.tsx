import {
  UseDraggableArguments,
  UseDroppableArguments,
  useDroppable,
} from "@dnd-kit/core";
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
  childIds?: string[];
  draggable?: boolean;
  id: string;
  parentId?: string | null;
  children: (params: any) => ReactNode;
}

export const CompWrapper: FC<CompWrapperProps> = observer((props) => {
  const {
    droppable = true,
    draggable = true,
    id,
    parentId,
    childIds,
    children,
  } = props;
  const { editorStore } = useEditorContext();

  const sortItemConfig = useMemo<UseDraggableArguments>(
    () => ({
      id,
      disabled: !draggable,
      data: {
        id,
        parentId,
        from: DragOrigin.PAN_SORT,
      } as DragInfoFromPanSort,
    }),
    [draggable, id, parentId]
  );

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable(sortItemConfig);

  const droppableConfig = useMemo<UseDroppableArguments>(
    () => ({
      id,
      disabled: isDragging,
      data: {
        id,
        parentId,
      } as DropInfo,
    }),
    [id, isDragging, parentId]
  );

  const { setNodeRef: setDropRef } = useDroppable(droppableConfig);

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

  const sortItemStyle = useMemo(
    () => ({
      transform: sortableItemTransform,
      transition,
      opacity: isDragging ? 0.6 : 1,
    }),
    [isDragging, sortableItemTransform, transition]
  );

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
      items={childIds || []}
      strategy={verticalListSortingStrategy}
    >
      {genComps}
    </SortableContext>
  ) : (
    genComps
  );
});
