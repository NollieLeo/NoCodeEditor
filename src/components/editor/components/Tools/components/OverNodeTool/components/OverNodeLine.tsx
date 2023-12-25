import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import useToolWrapperRect from "@/components/editor/components/Tools/hooks/useToolWrapperRect";
import { isNil } from "lodash-es";

export const OverNodeLine = observer(() => {
  const {
    editorStore: { overInfo, draggingInfo },
  } = useEditorContext();

  const wrapperRect = useToolWrapperRect();

  if (isNil(overInfo) || isNil(wrapperRect) || isNil(draggingInfo)) {
    return <></>;
  }

  return (
    <svg>
      <line />
    </svg>
  );
});
