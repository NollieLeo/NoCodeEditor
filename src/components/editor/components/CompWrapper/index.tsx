import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FC, ReactNode } from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import "./index.scss";
import { useEditorContext } from "../../hooks/useEditorContext";
import { DragOrigin } from "../../types";

export interface CompWrapperProps {
  droppable?: boolean;
  draggable?: boolean;
  id: string;
  children: (params: any) => ReactNode;
}

export const CompWrapper: FC<CompWrapperProps> = observer((props) => {
  const { children, droppable = true, draggable = true, id } = props;
  const { editorStore } = useEditorContext();

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    isDragging,
  } = useDraggable({
    id,
    disabled: !draggable,
    data: {
      componentId: id,
      from: DragOrigin.PAN,
    },
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id,
    disabled: !droppable || isDragging,
  });

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
