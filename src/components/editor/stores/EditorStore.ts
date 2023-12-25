import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
import { arrayMove } from "@dnd-kit/sortable";
import { useLocalStore } from "mobx-react-lite";
import { cloneDeep, findIndex } from "lodash-es";
import { DragInfo, DropInfo, SchemaData } from "../types";
import { mocks } from "./mocks";

export interface EditorState {
  /** 拖拽时候经过的元素信息 */
  overInfo: DropInfo | null;
  /** 页面被点击激活的元素id */
  focusedNodeId: string | null;
  /** 页面上被hover的元素id */
  hoveredNodeId: string | null;
  /** 面板的信息，包括缩放大小/位移信息 */
  panState: Omit<ReactZoomPanPinchState, "previousScale"> | null;
  /** 被拖拽的元素信息 */
  draggingInfo: DragInfo | null;
  nodesMap: Record<string, SchemaData>;
}

export interface EditorAction {
  setOverInfo(over: EditorState["overInfo"]): void;
  setFocusedNodeId(id: EditorState["focusedNodeId"]): void;
  setHoverNodeId(id: EditorState["hoveredNodeId"]): void;
  setPanState(panState: EditorState["panState"]): void;
  setDraggingInfo(node: EditorState["draggingInfo"]): void;
  addNode(data: SchemaData, target: string): void;
  movePos(parentId: string, from: string, to: string): void;
  cleanUpHelperNode(): void;
}

export type EditorStore = EditorState & EditorAction;

export const useEditorStore = () => {
  return useLocalStore<EditorStore>(() => ({
    overInfo: null,
    focusedNodeId: null,
    hoveredNodeId: null,
    panState: null,
    draggingInfo: null,
    nodesMap: cloneDeep(mocks),
    setOverInfo(overInfo) {
      this.overInfo = overInfo;
    },
    setFocusedNodeId(id) {
      this.focusedNodeId = id;
    },
    setHoverNodeId(id) {
      this.hoveredNodeId = id;
    },
    setPanState(state) {
      this.panState = state;
    },
    setDraggingInfo(info) {
      this.draggingInfo = info;
    },
    cleanUpHelperNode() {
      this.hoveredNodeId = null;
      this.focusedNodeId = null;
      this.overInfo = null;
    },
    /**
     * @description add node from sidebar
     */
    addNode(data, targetId) {
      const target = this.nodesMap[targetId];
      this.nodesMap[data.id] = data;
      if (target) {
        if (!target.childNodes) {
          target.childNodes = [data.id];
        } else {
          target.childNodes.push(data.id);
        }
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
  }));
};
