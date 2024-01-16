import { observer } from "mobx-react-lite";
import { memo } from "react";
import { ToolsContext } from "./context";
import { ToolsContent } from "./Content";
import { useEditorContext } from "../../hooks/useEditorContext";
import { keys } from "lodash-es";

const ToolsComp = observer(() => {
  const {
    editorStore: { nodesMap, isPanTransforming },
  } = useEditorContext();

  if (!keys(nodesMap).length || isPanTransforming) {
    return <></>;
  }

  return (
    <ToolsContext.Provider value={{}}>
      <ToolsContent />
    </ToolsContext.Provider>
  );
});

export const Tools = memo(ToolsComp);
