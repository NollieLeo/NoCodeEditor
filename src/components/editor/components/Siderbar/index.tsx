import { FC, useMemo, useRef } from "react";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { map, uniqueId, entries, filter } from "lodash-es";
import { useDraggable } from "@dnd-kit/core";
import {
  ComponentTypes,
  DragOrigin,
  DragInfoFromSideAdd,
  ComponentPosition,
} from "@/components/editor/types";

import "./index.scss";
import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "../../hooks/useEditorContext";

const PREFIX = "editor-siderbar";

interface SiderBarItemProps {
  type: ComponentTypes;
  name: string;
}

export const SiderBarItem: FC<SiderBarItemProps> = (props) => {
  const { type, name } = props;

  const id = useRef(uniqueId());

  const dragData: DragInfoFromSideAdd = {
    type,
    id: id.current,
    from: DragOrigin.SIDE_ADD,
  };

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: dragData,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`${PREFIX}-item`}
    >
      {name}
    </div>
  );
};

export const Siderbar = observer(() => {
  const {
    editorStore: { positonMode },
    editorStore,
  } = useEditorContext();

  const postionSelectOptions = useMemo(
    () =>
      map(ComponentPosition, (value) => ({
        value,
        label: value,
      })),
    []
  );

  const components = useMemo(() => {
    const filteredComponents = filter(
      entries(COMPONENTS_INFO),
      ([key]) =>
        key !== ComponentTypes.PAGE && key !== ComponentTypes.BLANK_CONTAINER
    );
    return (
      <div className={`${PREFIX}-container`}>
        {map(filteredComponents, ([key, value]) => (
          <SiderBarItem type={value.type} name={value.name} key={key} />
        ))}
      </div>
    );
  }, []);

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-mode`}>
        <div>Position:</div>
        <Select
          value={positonMode}
          options={postionSelectOptions}
          onChange={(mode) => editorStore.setPositionMode(mode)}
        />
      </div>
      {components}
    </div>
  );
});
