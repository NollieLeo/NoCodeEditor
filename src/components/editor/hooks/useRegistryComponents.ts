import { MetaInfo } from "../types/Meta";
import { ComponentInfo } from "../types";
import { useEditorContext } from "./useEditorContext";
import { assign, forEach } from "lodash-es";
import { useBoolean } from "ahooks";
import { useCallback } from "react";
import { useGenComponents } from "./useGenComponents";

export const useRegistryComponents = () => {
  const {
    editorStore: { scope },
  } = useEditorContext();
  const [isGenerating, { setTrue, setFalse }] = useBoolean(false);
  const { genComponents } = useGenComponents();

  const registryComponentsByScope = useCallback(
    (metaRerord: Record<MetaInfo["id"], MetaInfo>, scopeId: string) => {
      const componentsInfo: Record<ComponentInfo["id"], ComponentInfo> = {};
      forEach(metaRerord, (meta) => {
        const [componentInfo] = genComponents({ metas: [meta, null], scopeId });
        componentsInfo[componentInfo.id] = componentInfo;
      });
      return componentsInfo;
    },
    [genComponents]
  );

  const registryComponents = useCallback(
    (metaRecord: Record<MetaInfo["id"], MetaInfo>) => {
      setTrue();
      return new Promise<Record<ComponentInfo["id"], ComponentInfo>>(
        (resolve) => {
          const componentsInfo: Record<ComponentInfo["id"], ComponentInfo> = {};
          forEach(scope, (_, scopeId) => {
            assign(
              componentsInfo,
              registryComponentsByScope(metaRecord, scopeId)
            );
          });
          resolve(componentsInfo);
        }
      ).finally(setFalse);
    },
    [registryComponentsByScope, scope, setFalse, setTrue]
  );

  return { isGenerating, registryComponents };
};
