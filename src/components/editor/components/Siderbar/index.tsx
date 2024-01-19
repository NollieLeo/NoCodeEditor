import { FC, useMemo, useRef } from "react";
import { COMPONENTS_INFO } from "../../constants";
import { map, uniqueId, entries, filter } from "lodash-es";
import { useDraggable } from "@dnd-kit/core";
import {
  ComponentTypes,
  DragOrigin,
  DragInfoFromSideAdd,
} from "@/components/editor/types";

import "./index.scss";

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

export const Siderbar = () => {
  const components = useMemo(() => {
    const filteredComponents = filter(
      entries(COMPONENTS_INFO),
      ([key]) => key !== ComponentTypes.PAGE
    );
    return (
      <div className={`${PREFIX}-container`}>
        {map(filteredComponents, ([key, value]) => (
          <SiderBarItem type={value.type} name={value.name} key={key} />
        ))}
      </div>
    );
  }, []);

  return <div className={PREFIX}>{components}</div>;
};
