import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import { FC, memo } from "react";
import "./index.scss";

const ComponentNameTagComp: FC = observer(() => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const { getComponentInfo } = useGetComponentInfo();

  const componentInfo = getComponentInfo(focusedInfo!.id);

  return (
    <div className="editor-focused-comp-tag" key="component-name-tag">
      {componentInfo.name || componentInfo.type}
    </div>
  );
});

export const ComponentNameTag = memo(ComponentNameTagComp);
