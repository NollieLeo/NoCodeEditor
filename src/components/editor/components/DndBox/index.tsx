import { useDraggable, useDroppable } from "@dnd-kit/core";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, ReactNode, memo } from "react";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { DragOrigin } from "@/components/editor/types";

import "./index.scss";
import { CSS } from "@dnd-kit/utilities";

export interface CompWrapperProps {
  id: string;
  parentId: string | null;
  childIds: string[] | null;
  droppable?: boolean;
  draggable?: boolean;
  draggableOrigin: DragOrigin;
  children: (params: any) => ReactNode;
}

const DndBoxComp: FC<CompWrapperProps> = observer((props) => {
  const {
    draggable = true,
    id,
    parentId,
    childIds,
    draggableOrigin,
    droppable,
    children,
  } = props;

  const { editorStore } = useEditorContext();

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    transform,
  } = useDraggable({
    id,
    disabled: !draggable,
    data: {
      id,
      parentId,
      from: draggableOrigin,
    },
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id,
    data: {
      id,
      parentId,
      accepts: childIds,
    },
    disabled: !droppable,
  });

  const dropZoomCls = classNames("editor-dropzoom");

  const dragAppendStyle =
    draggableOrigin === DragOrigin.MOVE
      ? {
          transform: CSS.Transform.toString(transform),
        }
      : {};

  const onClick = (e: Event) => {
    e.stopPropagation();
    editorStore.setFocusedInfo({
      id,
    });
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
    className: dropZoomCls,
    style: dragAppendStyle,
    ref(nodeRef: HTMLElement) {
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
