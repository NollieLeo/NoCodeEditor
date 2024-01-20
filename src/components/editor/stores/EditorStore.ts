import { arrayMove } from "@dnd-kit/sortable";
import { useLocalStore } from "mobx-react-lite";
import { findIndex, isUndefined } from "lodash-es";
import { ComponentInfo } from "../types";
import { CSSProperties } from "react";

export interface EditorState {
  /** 页面被点击激活的元素id */
  focusedInfo: { id: string } | null;
  /** 页面上被hover的元素id */
  hoveredNodeId: string | null;
  /** 面板的缩放大小 */
  zoom: number;
  /** 面板是否在缩放/移动 */
  isPanTransforming: boolean;
  /** components info */
  componentsInfo: Record<ComponentInfo["id"], ComponentInfo>;
}

export interface EditorAction {
  setComponentsInfo(info: EditorState["componentsInfo"]): void;
  setFocusedInfo(id: EditorState["focusedInfo"]): void;
  setHoverNodeId(id: EditorState["hoveredNodeId"]): void;
  setZoom(zoom: EditorState["zoom"]): void;
  setPanIsTransforming(
    isPanTransforming: EditorState["isPanTransforming"]
  ): void;
  cleanUpHelperNode(): void;

  // ----------- node operations -----------
  addNode(data: ComponentInfo, target: string, idx?: number): void;
  updateNodeStyle(
    styles: CSSProperties | ((preStyles: CSSProperties) => CSSProperties),
    target: string
  ): void;
  movePos(parentId: string, from: string, to: string): void;
}

export type EditorStore = EditorState & EditorAction;

export const useEditorStore = () => {
  return useLocalStore<EditorStore>(() => ({
    focusedInfo: null,
    hoveredNodeId: null,
    zoom: 1,
    isPanTransforming: false,
    componentsInfo: {},

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
    /**
     * @description add component from sidebar
     */
    addNode(componentInfo, parentId, idx) {
      const parentComponent = this.componentsInfo[parentId];

      this.componentsInfo[componentInfo.id] = componentInfo;
      const { childsId } = parentComponent;
      if (!childsId) {
        parentComponent.childsId = [componentInfo.id];
      } else {
        const targetIdx =
          isUndefined(idx) || idx === -1 ? childsId?.length - 1 : idx;
        childsId.splice(targetIdx, 0, componentInfo.id);
      }
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
