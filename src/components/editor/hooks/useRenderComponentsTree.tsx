import { map } from "lodash-es";
import { COMPONENTS_INFO } from "../constants";
import { SchemaData, ComponentTypes } from "../types";
import { DndBox } from "../components/DndBox";
import { useEditorContext } from "./useEditorContext";
import { toJS } from "mobx";
import { Fragment } from "react";

export function useRenderComponentsTree(withDnd = true) {
  const { editorStore } = useEditorContext();
  const { nodesMap } = editorStore;

  const renderTreeWithDnd = (compId: SchemaData["id"]) => {
    const value = toJS(nodesMap[compId], {
      recurseEverything: true,
    });
    const { type, id, childNodes, data, parentId } = value;
    const { render: Component } = COMPONENTS_INFO[type];
    const droppable = [ComponentTypes.PAGE, ComponentTypes.CONTAINER].includes(
      type
    );
    const draggable = type !== ComponentTypes.PAGE;

    const childComps = childNodes?.length
      ? map(childNodes, (childId) => (
          <Fragment key={childId}>{renderTreeWithDnd(childId)}</Fragment>
        ))
      : data.children;

    return (
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
    );
  };

  const renderTreeWithoutDnd = (compId: SchemaData["id"]) => {
    const value = toJS(nodesMap[compId], {
      recurseEverything: true,
    });
    const { type, childNodes, data } = value;
    const { render: Component } = COMPONENTS_INFO[type];

    const childComps = childNodes?.length
      ? map(childNodes, (childId) => (
          <Fragment key={childId}>{renderTreeWithoutDnd(childId)}</Fragment>
        ))
      : data.children;

    return <Component {...data} children={childComps} />;
  };

  const render = withDnd ? renderTreeWithDnd : renderTreeWithoutDnd;

  return render;
}
