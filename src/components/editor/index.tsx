import { FC, PropsWithChildren, memo, useMemo } from "react";
import { useEditorStore } from "./stores/EditorStore";
import { EditorContext } from "./context/EditorContext";
import { observer } from "mobx-react-lite";
import { Content } from "./Content";
import { MOCK_SCOPE } from "./stores/mocks";

const EditorComp: FC<PropsWithChildren> = observer(() => {
  const editorStore = useEditorStore();

  const contextVal = useMemo(
    () => ({
      editorStore,
      scope: MOCK_SCOPE
    }),
    [editorStore]
  );

  return (
    <EditorContext.Provider value={contextVal}>
      <Content />
    </EditorContext.Provider>
  );
});

export const Editor = memo(EditorComp);
