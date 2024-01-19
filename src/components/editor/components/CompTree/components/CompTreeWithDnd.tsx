import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useGetNodeInfo } from "@/components/editor/hooks/useGetNodeInfo";
import { isNil, map, join } from "lodash-es";
import { useMemo, Fragment, memo } from "react";
import { observer } from "mobx-react-lite";
import { useDraggableConfig } from "../hooks/useDraggableConfig";
import { useDroppableConfig } from "../hooks/useDroppableConfig";
import { CompTreeProps } from "../types";
import { DndBox } from "../../DndBox";

const CompTreeWithDndComp = observer((props: Pick<CompTreeProps, "rootId">) => {
  const { rootId } = props;
  if (isNil(rootId)) {
    throw new Error(`root id;${rootId} does not exist`);
  }
  const { getNodeInfo } = useGetNodeInfo();
  const schemaData = getNodeInfo(rootId);
  const { type, id, childNodes, data } = schemaData;
  const { render: Component } = COMPONENTS_INFO[type];
  const { draggable, draggableData } = useDraggableConfig(schemaData);
  const { droppable, droppableData } = useDroppableConfig(schemaData);

  const childComps = useMemo(
    () =>
      childNodes?.length
        ? map(childNodes, (childId) => (
            <Fragment key={childId}>
              <CompTreeWithDnd rootId={childId} />
            </Fragment>
          ))
        : data.children,
    [childNodes, join(childNodes, "-"), data.children]
  );

  return (
    <DndBox
      key={id}
      id={id}
      droppable={droppable}
      draggable={draggable}
      draggableData={draggableData}
      droppableData={droppableData}
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
});
export const CompTreeWithDnd = memo(CompTreeWithDndComp);
