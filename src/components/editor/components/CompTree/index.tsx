import { isNil, map } from "lodash-es";
import { toJS } from "mobx";
import { Fragment, memo } from "react";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { ComponentTypes } from "@/components/editor/types";
import { DndBox } from "../DndBox";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";

interface CompTreeProps {
  rootId: string | null;
  withDnd?: boolean;
}

const CompTreeTmpl = observer((props: CompTreeProps) => {
  const { rootId, withDnd = true } = props;
  const { editorStore } = useEditorContext();

  if (isNil(rootId)) {
    return <></>;
  }

  const { nodesMap } = editorStore;

  const value = toJS(nodesMap[rootId]);

  const { type, id, childNodes, data, parentId } = value;

  const { render: Component } = COMPONENTS_INFO[type];

  const droppable = [ComponentTypes.PAGE, ComponentTypes.CONTAINER].includes(
    type
  );
  const draggable = type !== ComponentTypes.PAGE;

  const childComps = childNodes?.length
    ? map(childNodes, (childId) => (
        <Fragment key={childId}>
          <CompTree rootId={childId} withDnd={withDnd} />
        </Fragment>
      ))
    : data.children;

  return withDnd ? (
    <DndBox
      key={id}
      id={id}
      parentId={parentId}
      droppable={droppable}
      draggable={draggable}
      childIds={childNodes}
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
  ) : (
    <Component {...data} children={childComps} />
  );
});

export const CompTree = memo(CompTreeTmpl);
