import { arrayMove } from "@dnd-kit/sortable";
import { useLocalStore } from "mobx-react-lite";
import { findIndex, forEach, isNil, isUndefined } from "lodash-es";
import { ComponentInfo, ComponentPosition } from "../types";
import { CSSProperties } from "react";
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

  addComponents(
    componentsInfo: [ComponentInfo, ComponentInfo[] | null],
    index?: number
  ): void;
  addMetas(metas: [MetaInfo, MetaInfo[] | null], index?: number): void;

  // ----------- node operations -----------
  updateNodeStyle(
    styles: CSSProperties | ((preStyles: CSSProperties) => CSSProperties),
    target: string
  ): void;
  movePos(parentId: string, from: string, to: string): void;
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
    zoom: 1,
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
        isUndefined(idx) || idx === -1
          ? parentComponent.childsId?.length - 1
          : idx;
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
        isUndefined(idx) || idx === -1 ? parentMeta.childsId?.length - 1 : idx;
      parentMeta.childsId.splice(targetIdx, 0, root.id);
    },

    /**
     * @description move component in a sortable container
     */
    movePos(parentId: string, fromId: string, toId: string) {
      const parentComp = this.componentsInfo[parentId];
      if (!parent || !parentComp.childsId) {
        throw new Error(`move failed: node ${parentId} does not exist`);
      }
      if (fromId === toId) {
        return;
      }
      const { childsId } = parentComp;
      const fromIdx = findIndex(childsId, (id) => id === fromId);
      const toIdx = findIndex(childsId, (id) => id === toId);
      if (fromIdx === -1 || toIdx === -1) {
        return;
      }
      const newChildNodes = arrayMove(childsId, fromIdx, toIdx);
      childsId.length = 0;
      childsId.push(...newChildNodes);
    },

    updateNodeStyle(styles, targetId) {
      const targetComponent = this.componentsInfo[targetId];
      if (!targetComponent) {
        throw new Error(`update failed: node ${targetId} does not exist`);
      }
      const preStyle = targetComponent.attrs.style;
      const newStyle = typeof styles === "function" ? styles(preStyle) : styles;
      targetComponent.attrs.style = { ...preStyle, ...newStyle };
    },
  }));
};
