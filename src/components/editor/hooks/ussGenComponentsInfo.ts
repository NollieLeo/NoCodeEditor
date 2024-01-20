import { MetaInfo } from "../types/Meta";
import { ComponentInfo, ComponentTypes } from "../types";
import { useEditorContext } from "./useEditorContext";
import { assign, forEach, map } from "lodash-es";
import { useBoolean } from "ahooks";
import { useCallback } from "react";
import { genComponentId } from "../utils/Components";

export const useGenComponentsInfo = () => {
  const { scope } = useEditorContext();
  const [isGenerating, { setTrue, setFalse }] = useBoolean(false);

  // TODO(wkm) 先随便处理attrs
  const genAttrs = useCallback(
    (meta: MetaInfo, scopeId: string) => {
      const { attrs, type } = meta;
      const tempAttrs = { ...attrs } as ComponentInfo["attrs"];

      // page 特殊处理
      if (type === ComponentTypes.PAGE) {
        const size = scope[scopeId];
        tempAttrs.style = { ...tempAttrs.style, ...size };
      }

      return tempAttrs;
    },
    [scope]
  );

  const registryComponent = useCallback(
    ({ meta, scopeId }: { meta: MetaInfo; scopeId: string }): ComponentInfo => {
      const { id, type, parentId, childsId } = meta;

      return {
        id: genComponentId(id, scopeId),
        type,
        parentId: parentId ? genComponentId(parentId, scopeId) : null,
        meta,
        childsId: map(childsId, (childId) => genComponentId(childId, scopeId)),
        scopeId,
        attrs: genAttrs(meta, scopeId),
      };
    },
    [genAttrs]
  );

  const genComponentsInfoByScope = useCallback(
    (metaRerord: Record<MetaInfo["id"], MetaInfo>, scopeId: string) => {
      const componentsInfo: Record<ComponentInfo["id"], ComponentInfo> = {};
      forEach(metaRerord, (meta) => {
        const componentInfo = registryComponent({ meta, scopeId });
        componentsInfo[componentInfo.id] = componentInfo;
      });
      return componentsInfo;
    },
    [registryComponent]
  );

  const genComponentsInfo = useCallback(
    (metaRecord: Record<MetaInfo["id"], MetaInfo>) => {
      setTrue();
      return new Promise<Record<ComponentInfo["id"], ComponentInfo>>(
        (resolve) => {
          const frameRecord: Record<ComponentInfo["id"], ComponentInfo> = {};
          forEach(scope, (_, scopeId) => {
            assign(frameRecord, genComponentsInfoByScope(metaRecord, scopeId));
          });
          resolve(frameRecord);
        }
      ).finally(setFalse);
    },
    [genComponentsInfoByScope, scope, setFalse, setTrue]
  );

  return { isGenerating, genComponentsInfo };
};
