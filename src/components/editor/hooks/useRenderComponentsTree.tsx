import { map } from "lodash-es";
import { COMPONENTS_INFO } from "../constants";
import { SchemaData, ComponentTypes } from "../types";
import { CompWrapper } from "../components/CompWrapper";
import { Fragment } from "react";

export function useRenderComponentsTree(renderWithDndWrapper = true) {
  const render = renderWithDndWrapper ? renderCompWithDndWrapper : renderComp;

  function renderCompWithDndWrapper(value: SchemaData) {
    const { type, id, childNodes, data } = value;
    const { render: Component } = COMPONENTS_INFO[type];
    const droppable = [ComponentTypes.PAGE, ComponentTypes.CONTAINER].includes(
      type
    );
    const draggable = type !== ComponentTypes.PAGE;
    return (
      <CompWrapper key={id} id={id} droppable={droppable} draggable={draggable}>
        {(params) => (
          <Component
            {...data}
            {...params}
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

  function renderComps(nodes: SchemaData[]) {
    return map(nodes.slice(), (value) => (
      <Fragment key={value.id}>{render(value)}</Fragment>
    ));
  }

  return renderComps;
}
