import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useEditorTriggers } from "@/components/editor/hooks/useEditorTriggers";
import { useSelectComponent } from "@/components/editor/hooks/useSelectComponent";

export const DeleteBtn = observer(() => {
  const { onDeleteByCompId } = useEditorTriggers();
  const { onSelectComponent } = useSelectComponent();
  const { editorStore } = useEditorContext();
  const { focusedInfo } = editorStore;

  return (
    <Button
      size="small"
      onClick={() => {
        onSelectComponent();
        onDeleteByCompId(focusedInfo!.id);
      }}
      type="text"
      icon={<DeleteOutlined size={16} />}
    />
  );
});
