import { isNil, map } from "lodash-es";
import { toJS } from "mobx";
import { CSSProperties, Fragment, memo } from "react";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { ComponentTypes } from "@/components/editor/types";
import { DndBox } from "../DndBox";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";

interface CompTreeProps {
  rootId: string | null;
  withDnd?: boolean;
  style?: CSSProperties;
}

const CompTreeTmpl = observer((props: CompTreeProps) => {
  const { rootId, withDnd = true, style } = props;
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
      {(params) => {
        const compStyle = { ...data.style, ...params.style };
        return (
          <Component
            {...data}
            {...params}
            style={compStyle}
            children={childComps}
          />
        );
      }}
    </DndBox>
  ) : (
    <Component
      {...data}
      style={{ ...data.style, ...style }}
      children={childComps}
    />
  );
});

export const CompTree = memo(CompTreeTmpl);
