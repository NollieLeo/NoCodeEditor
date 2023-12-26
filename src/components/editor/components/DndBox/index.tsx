import {
  UseDraggableArguments,
  UseDroppableArguments,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, ReactNode, memo, useMemo } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";

import "./index.scss";

export interface CompWrapperProps {
  droppable?: boolean;
  childIds: string[] | null;
  draggable?: boolean;
  id: string;
  parentId: string | null;
  children: (params: any) => ReactNode;
}

const DndBoxComp: FC<CompWrapperProps> = observer((props) => {
  const { draggable = true, id, parentId, childIds, children } = props;
  const { editorStore } = useEditorContext();

  const { draggingInfo } = editorStore;

  const dragItemConfig = useMemo<UseDraggableArguments>(
    () => ({
      id,
      disabled: !draggable,
      data: {
        id,
        parentId,
        from: DragOrigin.PAN_SORT,
      },
    }),
    [draggable, id, parentId]
  );

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    isDragging,
  } = useDraggable(dragItemConfig);

  const droppableDisabled = useMemo(() => {
    if (!draggingInfo || draggingInfo.from === DragOrigin.SIDE_ADD) {
      return false;
    }
    return draggingInfo.parentId !== parentId;
  }, [draggingInfo, parentId]);

  const droppableConfig = useMemo<UseDroppableArguments>(
    () => ({
      id,
      data: {
        id,
        parentId,
        accepts: childIds,
      },
      disabled: droppableDisabled,
    }),
    [childIds, droppableDisabled, id, parentId]
  );

  const { setNodeRef: setDropRef } = useDroppable(droppableConfig);

  const dragItemStyle = useMemo(
    () => ({
      opacity: isDragging ? 0.6 : 1,
    }),
    [isDragging]
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
    style: dragItemStyle,
    className: dropZoomCls,
    ref(nodeRef: any) {
      setDragRef(nodeRef);
      setDropRef(nodeRef);
    },
    onClick,
    onMouseOver,
    onMouseLeave,
  });

  return genComps;
});

export const DndBox = memo(DndBoxComp);
