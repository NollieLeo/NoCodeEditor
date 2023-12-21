import { FC, useMemo, useRef } from "react";
import { COMPONENTS_INFO } from "../../constants";
import { map, uniqueId, entries, filter } from "lodash-es";
import { useDraggable } from "@dnd-kit/core";
import {
  ComponentTypes,
  DragOrigin,
  DragTargetFromSide,
} from "@/components/editor/types";

import "./index.scss";

const PREFIX = "editor-siderbar";

interface SiderBarItemProps {
  componentType: ComponentTypes;
  componentName: string;
}

export const SiderBarItem: FC<SiderBarItemProps> = (props) => {
  const { componentType, componentName } = props;

  const id = useRef(uniqueId());

  const dragData: DragTargetFromSide = {
    componentType,
    componentName,
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
      {componentName}
    </div>
  );
};

export const Siderbar = () => {
  const components = useMemo(() => {
    const filteredComponents = filter(
      entries(COMPONENTS_INFO),
      ([key]) => key !== ComponentTypes.PAGE
    );
    return (
      <div className={`${PREFIX}-container`}>
        {map(filteredComponents, ([key, value]) => (
          <SiderBarItem
            componentType={value.type}
            componentName={value.name}
            key={key}
          />
        ))}
      </div>
    );
  }, []);

  return <div className={PREFIX}>{components}</div>;
};
