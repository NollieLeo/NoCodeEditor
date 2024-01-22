import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import { FC, memo } from "react";
import "./index.scss";
import { RectInfo } from "react-moveable";

interface ComponentNameTagProps {
  rect: RectInfo;
}

const ComponentNameTagComp: FC<ComponentNameTagProps> = observer(({ rect }) => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const { getComponentInfo } = useGetComponentInfo();

  const componentInfo = getComponentInfo(focusedInfo!.id);

  return (
    <div
      className="editor-focused-comp-tag"
      style={{
        top: 0,
        left: -20,
      }}
      key="component-name-tag"
    >
      {componentInfo.name || componentInfo.type}
    </div>
  );
});

export const ComponentNameTag = memo(ComponentNameTagComp);
