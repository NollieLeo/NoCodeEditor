import { arrayMove } from "@dnd-kit/sortable";
import { useLocalStore } from "mobx-react-lite";
import { findIndex, forEach, isNil, isObject, isUndefined } from "lodash-es";
import { ComponentInfo, ComponentPosition } from "../types";
import { transaction } from "mobx";
import { MetaInfo } from "../types/Meta";
import { Scope } from "../types/Scope";

export interface EditorState {
  /** 页面被点击激活的元素id */
  focusedInfo: { id: string } | null;
  /** 页面上被hover的元素id */
  hoveredNodeId: string | null;
  /** 面板的缩放大小 */
  zoom: number;
  /** 面板是否在缩放/移动 */
  isPanTransforming: boolean;
  /** meta */
  meta: Record<string, MetaInfo>;
  /** scope */
  scope: Scope;
  /** components info */
  componentsInfo: Record<ComponentInfo["id"], ComponentInfo>;
  /** 添加组件的postion mode */
  positonMode: ComponentPosition;
}

export interface EditorAction {
  setPositionMode(mode: ComponentPosition): void;
  setComponentsInfo(info: EditorState["componentsInfo"]): void;
  setFocusedInfo(id: EditorState["focusedInfo"]): void;
  setHoverNodeId(id: EditorState["hoveredNodeId"]): void;
  setZoom(zoom: EditorState["zoom"]): void;
  setPanIsTransforming(
    isPanTransforming: EditorState["isPanTransforming"]
  ): void;
  cleanUpHelperNode(): void;

  /** add meta and components */
  addComponents(
    componentsInfo: [ComponentInfo, ComponentInfo[] | null],
    index?: number
  ): void;
  addMetas(metas: [MetaInfo, MetaInfo[] | null], index?: number): void;

  /** update meta and components attrs */
  updateMetaAttr<Key extends keyof MetaInfo["attrs"] = keyof MetaInfo["attrs"]>(
    id: string,
    attrName: Key,
    value: MetaInfo["attrs"][Key]
  ): void;
  updateComponentAttr<
    Key extends keyof ComponentInfo["attrs"] = keyof ComponentInfo["attrs"]
  >(
    id: string,
    attrName: Key,
    value: ComponentInfo["attrs"][Key]
  ): void;

  /** delete meta and component */
  deleteMeta(id: MetaInfo["id"]): void;
  deleteComponent(id: ComponentInfo["id"]): void;

  /** childs pos move */
  moveCompChildsPos(
    parentCompId: string,
    fromCompId: string,
    toCompId: string
  ): void;
  moveMetaChildsPos(
    parentMetaId: string,
    fromMetaId: string,
    toMetaId: string
  ): void;
}

export type EditorStore = EditorState & EditorAction;

export const useEditorStore = ({
  meta,
  scope,
}: {
  meta: Record<string, MetaInfo>;
  scope: Scope;
}) => {
  return useLocalStore<EditorStore>(() => ({
    scope,
    meta,
    componentsInfo: {},
    focusedInfo: null,
    hoveredNodeId: null,
    zoom: 0.6,
    isPanTransforming: false,
    positonMode: ComponentPosition.RELATIVE,

    setPositionMode(mode) {
      this.positonMode = mode;
    },
    setComponentsInfo(info) {
      this.componentsInfo = info;
    },
    setFocusedInfo(focusedInfo) {
      this.focusedInfo = focusedInfo;
    },
    setHoverNodeId(id) {
      this.hoveredNodeId = id;
    },
    setZoom(zoom) {
      this.zoom = zoom;
    },
    setPanIsTransforming(isPanTransforming) {
      this.isPanTransforming = isPanTransforming;
    },
    cleanUpHelperNode() {
      this.hoveredNodeId = null;
      this.focusedInfo = null;
    },

    addComponents([root, childs], idx) {
      if (isNil(root.parentId)) {
        throw new Error("parent id does not exist");
      }
      this.componentsInfo[root.id] = root;
      forEach(childs, (value) => {
        this.componentsInfo[value.id] = value;
      });

      const parentComponent = this.componentsInfo[root.parentId];
      if (!parentComponent.childsId) {
        parentComponent.childsId = [];
      }
      const targetIdx =
        isUndefined(idx) || idx === -1 ? parentComponent.childsId?.length : idx;
      parentComponent.childsId.splice(targetIdx, 0, root.id);
    },

    addMetas([root, childs], idx) {
      if (isNil(root.parentId)) {
        throw new Error("parent id does not exist");
      }
      this.meta[root.id] = root;
      forEach(childs, (value) => {
        this.meta[value.id] = value;
      });
      const parentMeta = this.meta[root.parentId];
      if (!parentMeta.childsId) {
        parentMeta.childsId = [];
      }
      const targetIdx =
        isUndefined(idx) || idx === -1 ? parentMeta.childsId?.length : idx;
      parentMeta.childsId.splice(targetIdx, 0, root.id);
    },

    deleteMeta(metaId) {
      transaction(() => {
        const { childsId, parentId } = this.meta[metaId];
        if (parentId) {
          const parent = this.meta[parentId];
          parent.childsId?.splice(parent.childsId.indexOf(metaId), 1);
        }
        delete this.meta[metaId];
        forEach(childsId, (childId) => {
          delete this.meta[childId];
        });
      });
    },

    deleteComponent(compId) {
      transaction(() => {
        const { childsId, parentId } = this.componentsInfo[compId];
        if (parentId) {
          const parent = this.componentsInfo[parentId];
          parent.childsId?.splice(parent.childsId.indexOf(compId), 1);
        }
        delete this.componentsInfo[compId];
        forEach(childsId, (childId) => {
          delete this.componentsInfo[childId];
        });
      });
    },

    updateMetaAttr(id, attrName, value) {
      const targetMeta = this.meta[id];
      if (!targetMeta) {
        throw new Error(`update attributes failed: meta ${id} does not exist`);
      }
      const targetAttr = targetMeta["attrs"][attrName];
      if (isObject(targetAttr)) {
        targetMeta["attrs"][attrName] = { ...targetAttr, ...value };
      } else {
        targetMeta["attrs"][attrName] = value;
      }
    },

    updateComponentAttr(id, attrName, value) {
      const targetComponent = this.componentsInfo[id];
      if (!targetComponent) {
        throw new Error(
          `update attributes failed: component ${id} does not exist`
        );
      }
      const targetAttr = targetComponent["attrs"][attrName];
      if (isObject(targetAttr)) {
        targetComponent["attrs"][attrName] = { ...targetAttr, ...value };
      } else {
        targetComponent["attrs"][attrName] = value;
      }
    },

    moveCompChildsPos(
      parentCompId: string,
      fromCompId: string,
      toCompId: string
    ) {
      const parentComp = this.componentsInfo[parentCompId];
      if (!parent || !parentComp.childsId) {
        throw new Error(
          `move failed: parent component: ${parentCompId} does not exist`
        );
      }
      if (fromCompId === toCompId) {
        return;
      }
      const { childsId } = parentComp;
      const fromIdx = findIndex(childsId, (id) => id === fromCompId);
      const toIdx = findIndex(childsId, (id) => id === toCompId);
      if (fromIdx === -1 || toIdx === -1) {
        return;
      }
      const newChildNodes = arrayMove(childsId, fromIdx, toIdx);
      childsId.length = 0;
      childsId.push(...newChildNodes);
    },

    moveMetaChildsPos(
      parentMetaId: string,
      fromMetaId: string,
      toMetaId: string
    ) {
      const parentMeta = this.meta[parentMetaId];
      if (!parent || !parentMeta.childsId) {
        throw new Error(
          `move failed: parent meta: ${parentMetaId} does not exist`
        );
      }
      if (fromMetaId === toMetaId) {
        return;
      }
      const { childsId } = parentMeta;
      const fromIdx = findIndex(childsId, (id) => id === fromMetaId);
      const toIdx = findIndex(childsId, (id) => id === toMetaId);
      if (fromIdx === -1 || toIdx === -1) {
        return;
      }
      const newChildNodes = arrayMove(childsId, fromIdx, toIdx);
      childsId.length = 0;
      childsId.push(...newChildNodes);
    },
  }));
};
