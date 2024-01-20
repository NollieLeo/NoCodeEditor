import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useComponentInfo } from "@/components/editor/hooks/useComponentInfo";
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
  const { getComponentInfo } = useComponentInfo();
  const schemaData = getComponentInfo(rootId);
  const { type, id, childsId, attrs } = schemaData;
  const { render: Component } = COMPONENTS_INFO[type];
  const { draggable, draggableData } = useDraggableConfig(schemaData);
  const { droppable, droppableData } = useDroppableConfig(schemaData);

  const childComps = useMemo(
    () =>
      childsId?.length
        ? map(childsId, (childId) => (
            <Fragment key={childId}>
              <CompTreeWithDnd rootId={childId} />
            </Fragment>
          ))
        : attrs.children,
    [childsId, join(childsId, "-"), attrs.children]
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
          {...attrs}
          {...params}
          style={{ ...attrs.style, ...params.style }}
          children={childComps}
        />
      )}
    </DndBox>
  );
});
export const CompTreeWithDnd = memo(CompTreeWithDndComp);
