import { useDraggable, useDroppable } from "@dnd-kit/core";
import { observer } from "mobx-react-lite";
import { FC, ReactNode, memo } from "react";
import {
  DragInfoFromPanMove,
  DragInfoFromPanSort,
  DragOrigin,
  DropInfo,
} from "@/components/editor/types";
import { CSS } from "@dnd-kit/utilities";

import "./index.scss";

export interface CompWrapperProps {
  id: string;
  droppable?: boolean;
  draggable?: boolean;
  draggableData: DragInfoFromPanMove | DragInfoFromPanSort;
  droppableData: DropInfo;
  children: (params: any) => ReactNode;
}

const DndBoxComp: FC<CompWrapperProps> = observer((props) => {
  const {
    draggable = true,
    id,
    draggableData,
    droppableData,
    droppable,
    children,
  } = props;

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
    transform,
  } = useDraggable({
    id,
    disabled: !draggable,
    data: draggableData,
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id,
    data: droppableData,
    disabled: !droppable,
  });

  const dragAppendStyle =
    draggableData.from === DragOrigin.MOVE
      ? {
          transform: CSS.Transform.toString(transform),
        }
      : {};

  const genComps = children({
    ...attributes,
    ...listeners,
    id,
    style: dragAppendStyle,
    ref(nodeRef: HTMLElement) {
      setDragRef(nodeRef);
      setDropRef(nodeRef);
    },
  });

  return genComps;
});

export const DndBox = memo(DndBoxComp);
