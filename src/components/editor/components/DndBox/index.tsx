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
  id: string;
  parentId: string | null;
  childIds: string[] | null;
  droppable?: boolean;
  draggable?: boolean;
  children: (params: any) => ReactNode;
}

const DndBoxComp: FC<CompWrapperProps> = observer((props) => {
  const { draggable = true, id, parentId, childIds, children } = props;
  const {
    editorStore,
    editorStore: { draggingInfo, nodesMap },
  } = useEditorContext();

  const draggableOrigin = useMemo(() => {
    const curDetail = nodesMap[id];
    let from = DragOrigin.SORT;
    if (
      curDetail.data.style.position &&
      ["absolute", "fixed"].includes(curDetail.data.style.position)
    ) {
      from = DragOrigin.MOVE;
    }
    return from;
  }, [id, nodesMap]);

  const draggableConfig = useMemo<UseDraggableArguments>(
    () => ({
      id,
      disabled: !draggable,
      data: {
        id,
        parentId,
        from: draggableOrigin,
      },
    }),
    [draggable, id, parentId, draggableOrigin]
  );

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners,
  } = useDraggable(draggableConfig);

  const droppableDisabled = useMemo(() => {
    if (!draggingInfo) {
      return false;
    }
    if (draggingInfo.from === DragOrigin.SIDE_ADD) {
      return !childIds;
    }
    return draggingInfo.parentId !== parentId;
  }, [childIds, draggingInfo, parentId]);

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

  const dropZoomCls = classNames("editor-dropzoom");

  const onClick = (e: Event) => {
    e.stopPropagation();
    editorStore.setFocusedInfo({
      id,
    });
  };

  const onMouseOver = (e: Event) => {
    e.stopPropagation();
    if (!draggingInfo) {
      editorStore.setHoverNodeId(id);
    }
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
