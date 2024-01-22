import { MetaInfo } from "../types/Meta";
import { ComponentInfo, ComponentTypes } from "../types";
import { useEditorContext } from "./useEditorContext";
import { assign, forEach, map } from "lodash-es";
import { useBoolean } from "ahooks";
import { useCallback } from "react";
import { genComponentId } from "../utils/Components";

export const useRegistryComponents = () => {
  const {
    editorStore: { scope },
  } = useEditorContext();
  const [isGenerating, { setTrue, setFalse }] = useBoolean(false);

  // TODO(wkm) 先随便处理attrs
  const genAttrs = useCallback(
    (meta: MetaInfo, scopeId: string) => {
      const { attrs, type } = meta;
      const tempAttrs = { ...attrs } as ComponentInfo["attrs"];

      // page 特殊处理，获取scope的具体值
      if (type === ComponentTypes.PAGE) {
        const size = scope[scopeId];
        tempAttrs.style = { ...tempAttrs.style, ...size };
      }

      return tempAttrs;
    },
    [scope]
  );

  const registryComponentByScope = useCallback(
    ({ meta, scopeId }: { meta: MetaInfo; scopeId: string }): ComponentInfo => {
      const { id, type, parentId, childsId } = meta;
      return {
        id: genComponentId(id, scopeId),
        type,
        parentId: parentId ? genComponentId(parentId, scopeId) : null,
        metaId: meta.id,
        childsId: map(childsId, (childId) => genComponentId(childId, scopeId)),
        scopeId,
        attrs: genAttrs(meta, scopeId),
      };
    },
    [genAttrs]
  );

  const registryComponentsByScope = useCallback(
    (metaRerord: Record<MetaInfo["id"], MetaInfo>, scopeId: string) => {
      const componentsInfo: Record<ComponentInfo["id"], ComponentInfo> = {};
      forEach(metaRerord, (meta) => {
        const componentInfo = registryComponentByScope({ meta, scopeId });
        componentsInfo[componentInfo.id] = componentInfo;
      });
      return componentsInfo;
    },
    [registryComponentByScope]
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
