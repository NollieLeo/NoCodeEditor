import {
  UseDraggableArguments,
  UseDroppableArguments,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, ReactNode, useMemo } from "react";
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

export const DndBox: FC<CompWrapperProps> = observer((props) => {
  const { draggable = true, id, parentId, childIds, children } = props;
  const { editorStore } = useEditorContext();

  const { draggingInfo } = editorStore;

  const dragData: Omit<DragInfoFromPanSort, "rect"> = useMemo(
    () => ({
      id,
      parentId,
      from: DragOrigin.PAN_SORT,
    }),
    [id, parentId]
  );

  const dragItemConfig = useMemo<UseDraggableArguments>(
    () => ({
      id,
      disabled: !draggable,
      data: dragData,
    }),
    [dragData, draggable, id]
  );

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    isDragging,
  } = useDraggable(dragItemConfig);

  const droppableData = useMemo<Omit<DropInfo, "rect">>(() => {
    return {
      id,
      parentId,
      accepts: childIds,
    };
  }, [childIds, id, parentId]);

  const droppableDisabled = useMemo(() => {
    if (!draggingInfo || draggingInfo.from === DragOrigin.SIDE_ADD) {
      return false;
    }
    return draggingInfo.parentId !== parentId;
  }, [draggingInfo, parentId]);

  const droppableConfig = useMemo<UseDroppableArguments>(() => {
    return {
      id,
      data: droppableData,
      disabled: droppableDisabled,
    };
  }, [droppableData, droppableDisabled, id]);

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
