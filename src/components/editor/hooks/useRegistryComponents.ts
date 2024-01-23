import { MetaInfo } from "../types/Meta";
import { ComponentInfo } from "../types";
import { useEditorContext } from "./useEditorContext";
import { assign, forEach, map } from "lodash-es";
import { useBoolean } from "ahooks";
import { useCallback } from "react";
import { useCreateComponents } from "./useCreateComponents";
import { genComponentId } from "../utils/Components";

export const useRegistryComponents = () => {
  const {
    editorStore: { scope },
  } = useEditorContext();
  const [isGenerating, { setTrue, setFalse }] = useBoolean(false);
  const { createComponents } = useCreateComponents();

  const registryComponentsByScope = useCallback(
    (metaRerord: Record<MetaInfo["id"], MetaInfo>, scopeId: string) => {
      const componentsInfo: Record<ComponentInfo["id"], ComponentInfo> = {};
      forEach(metaRerord, (meta) => {
        const generated = componentsInfo[genComponentId(meta.id, scopeId)];
        if (generated) {
          return;
        }
        const { childsId } = meta;
        const [componentInfo, childComponents] = createComponents({
          metas: [
            meta,
            childsId ? map(childsId, (childId) => metaRerord[childId]) : null,
          ],
          scopeId,
        });
        componentsInfo[componentInfo.id] = componentInfo;
        forEach(
          childComponents,
          (childComp) => (componentsInfo[childComp.id] = childComp)
        );
      });
      return componentsInfo;
    },
    [createComponents]
  );

  const registryComponents = useCallback(
    (metaRecord: Record<MetaInfo["id"], MetaInfo>) => {
      setTrue();
      return new Promise<Record<ComponentInfo["id"], ComponentInfo>>(
        (resolve) => {
          const componentsInfo: Record<ComponentInfo["id"], ComponentInfo> = {};
          forEach(scope, (_, scopeId) =>
            assign(
              componentsInfo,
              registryComponentsByScope(metaRecord, scopeId)
            )
          );
          resolve(componentsInfo);
        }
      ).finally(setFalse);
    },
    [registryComponentsByScope, scope, setFalse, setTrue]
  );

  return { isGenerating, registryComponents };
};
