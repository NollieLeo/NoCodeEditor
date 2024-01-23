import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useEditorTriggers } from "@/components/editor/hooks/useEditorTriggers";
import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { useGetMetaInfo } from "@/components/editor/hooks/useGetMetaInfo";
import { ComponentTypes } from "@/components/editor/types";
import { genComponentId } from "@/components/editor/utils/Components";
import { find, forEach, map } from "lodash-es";
import { transaction } from "mobx";
import { observer } from "mobx-react-lite";
import { Button, Select, Tooltip } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

export const ConditionalOperations = observer(() => {
  const {
    editorStore: { focusedInfo },
    editorStore,
  } = useEditorContext();

  const { getComponentInfo } = useGetComponentInfo();
  const { onAdd, onDeleteByCompId } = useEditorTriggers();
  const { getMetaInfoByCompId, getMetaInfo } = useGetMetaInfo();

  const { childsId: metaChildsId, type } = getMetaInfoByCompId(focusedInfo!.id);
  const {
    childsId: componentChildsId,
    scopeId,
    metaId,
  } = getComponentInfo(focusedInfo!.id);

  const selectConditionOptions = map(metaChildsId, (childId) => {
    const metaInfo = getMetaInfo(childId);
    return {
      label: metaInfo.name,
      value: genComponentId(metaInfo.id, scopeId),
    };
  });

  const handleSelectChange = (selectCompId: string) => {
    transaction(() => {
      forEach(componentChildsId!, (childCompId) => {
        editorStore.updateComponentAttr(childCompId, "style", {
          display: selectCompId === childCompId ? "flex" : "none",
        });
      });
    });
  };

  const getSelectedChild = () => {
    if (!componentChildsId || !componentChildsId.length) {
      return;
    }
    const targetComponentId = find(componentChildsId, (childCompId) => {
      const { attrs } = getComponentInfo(childCompId);
      return attrs.style.display !== "none";
    });
    return targetComponentId;
  };

  const handleAddCondition = () => {
    const addMeta = {
      type: ComponentTypes.BLANK_CONTAINER,
      parentId: metaId,
    };
    const {
      components: [root],
    } = onAdd(addMeta, scopeId);
    handleSelectChange(root.id);
  };

  const handleDeleteCondition = (e: any, index: any) => {
    e.stopPropagation();
    const target = selectConditionOptions[index];
    const first = selectConditionOptions[0];
    onDeleteByCompId(target.value);
    handleSelectChange(first.value);
  };

  if (type !== ComponentTypes.CONDITIONAL_CONTAINER) {
    return;
  }

  return (
    <>
      <Select
        key={getSelectedChild()}
        style={{ width: "100px", background: "#1450d9" }}
        value={getSelectedChild()}
        onSelect={handleSelectChange}
        options={selectConditionOptions}
        optionRender={({ label }, { index }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{label}</span>
            <DeleteOutlined
              size={16}
              onClick={(e) => handleDeleteCondition(e, index)}
            />
          </div>
        )}
        size="small"
      />
      <Tooltip title="添加条件">
        <Button
          size="small"
          onClick={handleAddCondition}
          type="text"
          icon={<PlusOutlined size={16} />}
        />
      </Tooltip>
    </>
  );
});
