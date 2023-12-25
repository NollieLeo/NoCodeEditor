import { memo } from "react";
import { observer } from "mobx-react-lite";
import { OverContainerHighlight } from "./components/OverContainerHighlight";
import { OverNodeLine } from "./components/OverNodeLine";

const OverNodeToolComp = observer(() => {
  return (
    <>
      <OverContainerHighlight />
      <OverNodeLine />
    </>
  );
});

export const OverNodeTool = memo(OverNodeToolComp);
