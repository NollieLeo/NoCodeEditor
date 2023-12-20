import { FC, useRef } from "react";
import { COMPONENTS_INFO } from "../../constants";
import "./index.scss";
import { map, uniqueId } from "lodash-es";
import { useDraggable } from "@dnd-kit/core";
import { ComponentTypes } from "../../types";

const PREFIX = "editor-siderbar";

interface SiderBarItemProps {
  type: ComponentTypes;
  name: string;
}

export const SiderBarItem: FC<SiderBarItemProps> = (props) => {
  const { name, type } = props;

  const id = useRef(uniqueId());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      type,
      fromSidebar: true,
    },
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

export const Siderbar = () => {
  const renderSiderItem = () => (
    <div className={`${PREFIX}-container`}>
      {map(COMPONENTS_INFO, (value, key) => (
        <SiderBarItem type={value.type} name={value.name} key={key} />
      ))}
    </div>
  );

  return <div className={PREFIX}>{renderSiderItem()}</div>;
};
