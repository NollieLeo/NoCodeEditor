import { isNil, join, map } from "lodash-es";
import { CSSProperties, Fragment, memo, useMemo } from "react";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { ComponentTypes, DragOrigin } from "@/components/editor/types";
import { DndBox } from "../DndBox";
import { observer } from "mobx-react-lite";
import { isAbsoluteOrFixed } from "../../utils/layout";
import { useGetDragInfo } from "../../hooks/useGetDragInfo";
import { useGetNodeInfo } from "../../hooks/useGetNodeInfo";

interface CompTreeProps {
  rootId: string | null;
  withDnd?: boolean;
  style?: CSSProperties;
}

const CompTreeTmpl = observer((props: CompTreeProps) => {
  const { rootId, withDnd = true, style } = props;
  if (isNil(rootId)) {
    throw new Error(`root id;${rootId} does not exist`);
  }

  const dragInfo = useGetDragInfo();
  const { getNodeInfo } = useGetNodeInfo();

  const { type, id, childNodes, data, parentId } = getNodeInfo(rootId);

  const { render: Component } = COMPONENTS_INFO[type];

  const draggable = useMemo(() => {
    return type !== ComponentTypes.PAGE;
  }, [type]);

  const draggableOrigin = useMemo(() => {
    let from = DragOrigin.SORT;
    if (isAbsoluteOrFixed(data.style)) {
      from = DragOrigin.MOVE;
    }
    return from;
  }, [data.style]);

  const droppable = useMemo(() => {
    if (dragInfo?.from === DragOrigin.SIDE_ADD) {
      return (
        [ComponentTypes.PAGE, ComponentTypes.CONTAINER].includes(type) &&
        !!childNodes
      );
    }
    return parentId === dragInfo?.parentId;
  }, [childNodes, dragInfo, parentId, type]);

  const childComps = useMemo(
    () =>
      childNodes?.length
        ? map(childNodes, (childId) => (
            <Fragment key={childId}>
              <CompTree rootId={childId} withDnd={withDnd} />
            </Fragment>
          ))
        : data.children,
    [childNodes, join(childNodes, "-"), data.children, withDnd]
  );

  const renderDndTree = () => {
    return (
      <DndBox
        key={id}
        id={id}
        parentId={parentId}
        droppable={droppable}
        draggable={draggable}
        childIds={childNodes}
        draggableOrigin={draggableOrigin}
      >
        {(params) => (
          <Component
            {...data}
            {...params}
            style={{ ...data.style, ...params.style }}
            children={childComps}
          />
        )}
      </DndBox>
    );
  };

  const renderDefaultTree = () => (
    <Component
      {...data}
      style={{ ...data.style, ...style }}
      children={childComps}
    />
  );

  return withDnd ? renderDndTree() : renderDefaultTree();
});

export const CompTree = memo(CompTreeTmpl);
