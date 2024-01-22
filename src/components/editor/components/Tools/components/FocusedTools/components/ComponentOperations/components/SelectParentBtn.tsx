import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { Tooltip, Button } from "zui-pro";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { useSelectComponent } from "@/components/editor/hooks/useSelectComponent";

export const SelectParentBtn = () => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const { onSelectComponent } = useSelectComponent();

  const { getComponentInfo } = useGetComponentInfo();

  const handleSelectParent = () => {
    const { parentId } = getComponentInfo(focusedInfo!.id);
    if (!parentId) {
      return;
    }
    onSelectComponent(parentId);
  };

  return (
    <Tooltip title="选择父级">
      <Button
        onClick={handleSelectParent}
        size="small"
        type="text"
        icon={<VerticalAlignTopOutlined />}
      />
    </Tooltip>
  );
};
