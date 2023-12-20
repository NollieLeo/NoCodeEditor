import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FC, ReactNode, memo } from "react";
import classNames from "classnames";
import "./index.scss";

export interface CompWrapperProps {
  droppable?: boolean;
  draggable?: boolean;
  id: string;
  children: (params: any) => ReactNode;
}

export const CompWrapper: FC<CompWrapperProps> = memo((props) => {
  const { children, droppable = true, draggable = true, id } = props;

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    isDragging,
  } = useDraggable({
    id,
    disabled: !draggable,
    data: {
      id,
    },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id,
    disabled: !droppable || isDragging,
  });

  const dropZoomCls = classNames("editor-dropzoom", {
    "editor-dropzoom-isOver": isOver,
  });

  const onClick = (e: Event) => {
    e.stopPropagation();
    console.log(e);
  };

  return children({
    ...attributes,
    ...listeners,
    ref(nodeRef: any) {
      setDragRef(nodeRef);
      setDropRef(nodeRef);
    },
    onClick,
    className: dropZoomCls,
    id,
  });
});
