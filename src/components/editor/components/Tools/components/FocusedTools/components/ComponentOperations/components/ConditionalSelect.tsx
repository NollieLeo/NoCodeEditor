import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { useGetMetaInfo } from "@/components/editor/hooks/useGetMetaInfo";
import { ComponentTypes } from "@/components/editor/types";
import { genComponentId } from "@/components/editor/utils/Components";
import { find, forEach, map } from "lodash-es";
import { transaction } from "mobx";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Select } from "zui-pro";

export const ConditionalSelect = observer(() => {
  const {
    editorStore: { focusedInfo },
  } = useEditorContext();

  const { getComponentInfo } = useGetComponentInfo();
  const { getMetaInfoByCompId, getMetaInfo } = useGetMetaInfo();

  const { childsId: metaChildsId, type } = getMetaInfoByCompId(focusedInfo!.id);
  const { childsId: componentChildsId, scopeId } = getComponentInfo(
    focusedInfo!.id
  );

  const selectConditionOptions = useMemo(() => {
    return map(metaChildsId, (childId) => {
      const metaInfo = getMetaInfo(childId);
      return {
        label: metaInfo.name,
        value: genComponentId(metaInfo.id, scopeId),
      };
    });
  }, [getMetaInfo, metaChildsId, scopeId]);

  const handleSelectChange = (selectCompId: string) => {
    transaction(() => {
      forEach(componentChildsId!, (childCompId) => {
        const { attrs } = getComponentInfo(childCompId);
        if (selectCompId === childCompId) {
          attrs.style.display = "flex";
        } else {
          attrs.style.display = "none";
        }
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

  if (type !== ComponentTypes.CONDITIONAL_CONTAINER) {
    return;
  }

  return (
    <Select
      key={getSelectedChild()}
      style={{ width: "100px" }}
      value={getSelectedChild()}
      onSelect={handleSelectChange}
      options={selectConditionOptions}
      size="small"
    />
  );
});
