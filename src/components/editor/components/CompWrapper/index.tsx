import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FC, PropsWithChildren, memo } from "react";
import classNames from "classnames";
import "./index.scss";

export interface CompWrapperProps {
  droppable?: boolean;
  draggable?: boolean;
  id: string;
}

export const CompWrapper: FC<PropsWithChildren<CompWrapperProps>> = memo(
  (props) => {
    const { children, droppable = true, draggable = true, id } = props;

    const { setNodeRef: setDropRef, isOver } = useDroppable({
      id,
      disabled: !droppable,
    });

    const {
      setNodeRef: setDragRef,
      attributes,
      listeners,
    } = useDraggable({
      id,
      disabled: !draggable,
    });

    const dropZoomCls = classNames("editor-dropzoom", {
      "editor-dropzoom-isOver": isOver,
    });

    return (
      <div
        {...attributes}
        {...listeners}
        ref={(nodeRef) => {
          setDropRef(nodeRef);
          setDragRef(nodeRef);
        }}
        className={dropZoomCls}
        id={id}
      >
        {children}
      </div>
    );
  }
);
