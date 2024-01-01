import { observer } from "mobx-react-lite";
import { memo } from "react";
import { ToolsContext } from "./context";
import { ToolsContent } from "./Content";
import { useEditorContext } from "../../hooks/useEditorContext";
import { isNil, keys } from "lodash-es";

const ToolsComp = observer(() => {
  const {
    editorStore: { panState, nodesMap, isPanTransforming },
  } = useEditorContext();

  if (isNil(panState) || !keys(nodesMap).length || isPanTransforming) {
    return <></>;
  }

  return (
    <ToolsContext.Provider
      value={{
        panState,
      }}
    >
      <ToolsContent />
    </ToolsContext.Provider>
  );
});

export const Tools = memo(ToolsComp);
