import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
import { arrayMove } from "@dnd-kit/sortable";
import { useLocalStore } from "mobx-react-lite";
import { cloneDeep, findIndex, isUndefined } from "lodash-es";
import { DragInfo, DropInfo, SchemaData } from "../types";
import { mocks } from "./mocks";
import { CSSProperties } from "react";

export interface PanState
  extends Omit<ReactZoomPanPinchState, "previousScale"> {}

export interface EditorState {
  /** 拖拽时候经过的元素信息 */
  overInfo: DropInfo | null;
  /** 页面被点击激活的元素id */
  focusedInfo: { id: string } | null;
  /** 页面上被hover的元素id */
  hoveredNodeId: string | null;
  /** 面板的信息，包括缩放大小/位移信息 */
  panState: PanState | null;
  /** 面板是否在缩放/移动 */
  isPanTransforming: boolean;
  /** 被拖拽的元素信息 */
  draggingInfo: DragInfo | null;
  /** 所有的元素 */
  nodesMap: Record<string, SchemaData>;
}

export interface EditorAction {
  setOverInfo(over: EditorState["overInfo"]): void;
  setFocusedInfo(id: EditorState["focusedInfo"]): void;
  setHoverNodeId(id: EditorState["hoveredNodeId"]): void;
  setPanState(panState: EditorState["panState"]): void;
  setPanIsTransforming(
    isPanTransforming: EditorState["isPanTransforming"]
  ): void;
  setDraggingInfo(node: EditorState["draggingInfo"]): void;
  cleanUpHelperNode(): void;

  // ----------- node operations -----------
  addNode(data: SchemaData, target: string, idx?: number): void;
  updateNodeStyle(styles: CSSProperties, target: string): void;
  movePos(parentId: string, from: string, to: string): void;
}

export type EditorStore = EditorState & EditorAction;

export const useEditorStore = () => {
  return useLocalStore<EditorStore>(() => ({
    overInfo: null,
    focusedInfo: null,
    hoveredNodeId: null,
    panState: null,
    isPanTransforming: false,
    draggingInfo: null,
    nodesMap: cloneDeep(mocks),
    setOverInfo(overInfo) {
      this.overInfo = overInfo;
    },
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
    setDraggingInfo(info) {
      this.draggingInfo = info;
    },
    cleanUpHelperNode() {
      this.hoveredNodeId = null;
      this.focusedInfo = null;
      this.overInfo = null;
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

    updateNodeStyle(styles, target) {
      const updateTarget = this.nodesMap[target];
      if (!updateTarget) {
        throw new Error(`update failed: node ${target} does not exist`);
      }
      updateTarget.data.style = { ...updateTarget.data.style, ...styles };
    },
  }));
};
