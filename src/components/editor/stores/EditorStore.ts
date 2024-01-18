import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
import { arrayMove } from "@dnd-kit/sortable";
import { useLocalStore } from "mobx-react-lite";
import { cloneDeep, findIndex, isUndefined } from "lodash-es";
import { SchemaData } from "../types";
import { mocks } from "./mocks";
import { CSSProperties } from "react";

export interface PanState
  extends Omit<ReactZoomPanPinchState, "previousScale"> {}

export interface EditorState {
  /** 页面被点击激活的元素id */
  focusedInfo: { id: string } | null;
  /** 页面上被hover的元素id */
  hoveredNodeId: string | null;
  /** 面板的信息，包括缩放大小/位移信息 */
  panState: PanState;
  /** 面板是否在缩放/移动 */
  isPanTransforming: boolean;
  /** 所有的元素 */
  nodesMap: Record<string, SchemaData>;
}

export interface EditorAction {
  setFocusedInfo(id: EditorState["focusedInfo"]): void;
  setHoverNodeId(id: EditorState["hoveredNodeId"]): void;
  setPanState(panState: EditorState["panState"]): void;
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
    panState: {
      scale: 1,
      positionX: 1,
      positionY: 1,
    },
    isPanTransforming: false,
    nodesMap: cloneDeep(mocks),
    setFocusedInfo(focusedInfo) {
      this.focusedInfo = focusedInfo;
    },
    setHoverNodeId(id) {
      this.hoveredNodeId = id;
    },
    setPanState(state) {
      this.panState = state;
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
        const targetIdx = isUndefined(idx) ? childNodes?.length - 1 : idx;
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
