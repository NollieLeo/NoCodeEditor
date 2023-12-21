import { FC, useRef } from "react";
import { COMPONENTS_INFO } from "../../constants";
import "./index.scss";
import { map, uniqueId } from "lodash-es";
import { useDraggable } from "@dnd-kit/core";
import { ComponentTypes, DragOrigin, DragTargetFromSide } from "../../types";

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
  const renderSiderItem = () => (
    <div className={`${PREFIX}-container`}>
      {map(COMPONENTS_INFO, (value, key) => (
        <SiderBarItem
          componentType={value.type}
          componentName={value.name}
          key={key}
        />
      ))}
    </div>
  );

  return <div className={PREFIX}>{renderSiderItem()}</div>;
};
