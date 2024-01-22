import { memo } from "react";
import { RectInfo } from "react-moveable";
import { observer } from "mobx-react-lite";
import { SelectParentBtn } from "./components/SelectParentBtn";
import { DeleteBtn } from "./components/DeleteBtn";

import "./index.scss";
import { ConditionalOperations } from "./components/ConditionalOperations";

interface ComponentOperationsProps {
  rect: RectInfo;
}

const ComponentOperationsComp = observer((props: ComponentOperationsProps) => {
  const { rect } = props;

  return (
    <div
      className="editor-focused-comp-operations"
      style={{
        right: -rect.width,
      }}
    >
      <ConditionalOperations />
      <SelectParentBtn />
      <DeleteBtn />
    </div>
  );
});
export const ComponentOperations = memo(ComponentOperationsComp);
