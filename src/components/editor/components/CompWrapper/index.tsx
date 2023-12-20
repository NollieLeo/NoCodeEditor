import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FC, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import "./index.scss";
import { useBoardContext } from "../../hooks/useBoardContext";

export interface CompWrapperProps {
  droppable?: boolean;
  draggable?: boolean;
  id: string;
  children: (params: any) => ReactNode;
}

export const CompWrapper: FC<CompWrapperProps> = observer((props) => {
  const { children, droppable = true, draggable = true, id } = props;
  const { boardStore } = useBoardContext();

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

  const { setNodeRef: setDropRef } = useDroppable({
    id,
    disabled: !droppable || isDragging,
  });

  const dropZoomCls = classNames("editor-dropzoom");

  const onClick = (e: Event) => {
    e.stopPropagation();
    boardStore.setActiveNodeId(id);
  };

  const onMouseOver = (e: Event) => {
    e.stopPropagation();
    boardStore.setHoverNodeId(id);
  };

  const onMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    boardStore.setHoverNodeId(null);
  };

  return children({
    ...attributes,
    ...listeners,
    ref(nodeRef: any) {
      setDragRef(nodeRef);
      setDropRef(nodeRef);
    },
    onClick,
    onMouseOver,
    onMouseLeave,
    className: dropZoomCls,
    id,
  });
});
