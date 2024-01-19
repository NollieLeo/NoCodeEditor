import { arrayMove } from "@dnd-kit/sortable";
import { useLocalStore } from "mobx-react-lite";
import { cloneDeep, findIndex, isUndefined } from "lodash-es";
import { SchemaData } from "../types";
import { mockBreakpoints, mocks } from "./mocks";
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
  /** 所有的元素 */
  nodesMap: Record<string, SchemaData>;
  /** 断点 */
  breakpoints: Record<
    string,
    {
      height: number;
      width: number;
    }
  >;
}

export interface EditorAction {
  setFocusedInfo(id: EditorState["focusedInfo"]): void;
  setHoverNodeId(id: EditorState["hoveredNodeId"]): void;
  setZoom(zoom: EditorState["zoom"]): void;
  setPanIsTransforming(
    isPanTransforming: EditorState["isPanTransforming"]
  ): void;
  cleanUpHelperNode(): void;

  // ----------- node operations -----------
  addNode(data: SchemaData, target: string, idx?: number): void;
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
    breakpoints: cloneDeep(mockBreakpoints),
    nodesMap: cloneDeep(mocks),
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
     * @description add node from sidebar
     */
    addNode(data, targetId, idx) {
      const target = this.nodesMap[targetId];
      if (!target) {
        return;
      }
      this.nodesMap[data.id] = data;
      const { childNodes } = target;
      if (!childNodes) {
        target.childNodes = [data.id];
      } else {
        const targetIdx =
          isUndefined(idx) || idx === -1 ? childNodes?.length - 1 : idx;
        childNodes.splice(targetIdx, 0, data.id);
      }
    },
    /**
     * @description move node in a sortable container
     */
    movePos(parentId: string, fromId: string, toId: string) {
      const parent = this.nodesMap[parentId];
      if (!parent || !parent.childNodes) {
        throw new Error(`move failed: node ${parentId} does not exist`);
      }
      if (fromId === toId) {
        return;
      }
      const { childNodes } = parent;
      const fromIdx = findIndex(childNodes, (id) => id === fromId);
      const toIdx = findIndex(childNodes, (id) => id === toId);
      if (fromIdx === -1 || toIdx === -1) {
        return;
      }
      const newChildNodes = arrayMove(childNodes, fromIdx, toIdx);
      childNodes.length = 0;
      childNodes.push(...newChildNodes);
    },

    updateNodeStyle(styles, targetId) {
      const updateTarget = this.nodesMap[targetId];
      if (!updateTarget) {
        throw new Error(`update failed: node ${targetId} does not exist`);
      }
      const preStyle = updateTarget.data.style;
      const updateStyle =
        typeof styles === "function" ? styles(preStyle) : styles;
      updateTarget.data.style = { ...preStyle, ...updateStyle };
    },
  }));
};
