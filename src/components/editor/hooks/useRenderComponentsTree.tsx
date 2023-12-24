import { map } from "lodash-es";
import { COMPONENTS_INFO } from "../constants";
import { SchemaData, ComponentTypes } from "../types";
import { CompWrapper } from "../components/CompWrapper";
import { Fragment } from "react";

export function useRenderComponentsTree(renderWithDndWrapper = true) {
  const render = renderWithDndWrapper ? renderCompWithDndWrapper : renderComp;

  function renderCompWithDndWrapper(value: SchemaData) {
    const { type, id, childNodes, data, parentId } = value;
    const { render: Component } = COMPONENTS_INFO[type];
    const droppable = [ComponentTypes.PAGE, ComponentTypes.CONTAINER].includes(
      type
    );
    const draggable = type !== ComponentTypes.PAGE;
    const childIds = childNodes ? map(childNodes, ({ id }) => id) : undefined;
    return (
      <CompWrapper
        key={id}
        id={id}
        parentId={parentId}
        droppable={droppable}
        draggable={draggable}
        childIds={childIds}
      >
        {(params) => (
          <Component
            {...data}
            {...params}
            style={{ ...data.style, ...params.style }}
            children={
              childNodes?.length ? renderComps(childNodes) : data.children
            }
          />
        )}
      </CompWrapper>
    );
  }

  function renderComp(value: SchemaData) {
    const { type, childNodes, data } = value;
    const { render: Component } = COMPONENTS_INFO[type];
    return (
      <Component
        {...data}
        children={childNodes?.length ? renderComps(childNodes) : data.children}
      />
    );
  }

  const renderComps = (nodes: SchemaData[]) =>
    map(nodes, (value) => <Fragment key={value.id}>{render(value)}</Fragment>);

  return renderComps;
}
