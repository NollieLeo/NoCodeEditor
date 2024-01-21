import { useComponentInfo } from "@/components/editor/hooks/useComponentInfo";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import { FC, memo } from "react";

const ComponentNameTagComp: FC = observer(() => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const { getComponentInfo } = useComponentInfo();

  const componentInfo = getComponentInfo(focusedInfo!.id);

  return (
    <div
      key="component-name-tag"
      style={{
        position: "absolute",
        left: 0,
        top: -30,
        background: "blue",
        borderRadius: 4,
        padding: "2px 4px",
        color: "white",
        fontSize: "12px",
        whiteSpace: "nowrap",
        fontWeight: "bold",
        willChange: "transform",
      }}
    >
      {componentInfo.name || componentInfo.type}
    </div>
  );
});

export const ComponentNameTag = memo(ComponentNameTagComp);
