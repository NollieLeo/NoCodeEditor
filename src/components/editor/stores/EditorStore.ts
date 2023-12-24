import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
import { useLocalStore } from "mobx-react-lite";
import { observable, transaction } from "mobx";
import { findIndex, forEach } from "lodash-es";
import { DragInfo, SchemaData } from "../types";
import { mock } from "./mock";
import { swapPos } from "./utils/swapPos";

export interface EditorState {
  /** 拖拽时候经过的元素id */
  overNodeId: string | null;
  /** 页面被点击激活的元素id */
  focusedNodeId: string | null;
  /** 页面上被hover的元素id */
  hoveredNodeId: string | null;
  /** 面板的信息，包括缩放大小/位移信息 */
  panState: Omit<ReactZoomPanPinchState, "previousScale"> | null;
  /** 被拖拽的元素信息 */
  draggingInfo: DragInfo | null;
  nodes: SchemaData[];
  nodeMap: Record<string, SchemaData>;
}

export interface EditorAction {
  setOverNodeId(over: EditorState["overNodeId"]): void;
  setFocusedNodeId(id: EditorState["focusedNodeId"]): void;
  setHoverNodeId(id: EditorState["hoveredNodeId"]): void;
  setPanState(panState: EditorState["panState"]): void;
  setDraggingInfo(node: EditorState["draggingInfo"]): void;
  addNode(data: SchemaData, target: string): void;
  movePos(parentId: string, from: string, to: string): void;
  cleanUpHelperNode(): void;
}

export type EditorStore = EditorState & EditorAction;

export const useEditorStore = () =>
  useLocalStore<EditorStore>(() => ({
    overNodeId: null,
    focusedNodeId: null,
    hoveredNodeId: null,
    panState: null,
    draggingInfo: null,
    nodes: mock,
    get nodeMap() {
      const map: Record<string, SchemaData> = {};
      const generateNodesMap = (
        nodes: SchemaData[],
        parentId?: string | null
      ) => {
        forEach(nodes, (value) => {
          map[value.id] = { ...value, parentId };
          if (value.childNodes) {
            generateNodesMap(value.childNodes, value.id);
          }
        });
      };
      generateNodesMap(this.nodes, null);
      return map;
    },
    setOverNodeId(id) {
      this.overNodeId = id;
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
    setDraggingInfo(node) {
      this.draggingInfo = node;
    },
    cleanUpHelperNode() {
      this.hoveredNodeId = null;
      this.focusedNodeId = null;
      this.overNodeId = null;
    },
    /**
     * @description add node from sidebar
     */
    addNode(data, targetId) {
      const target = this.nodeMap[targetId];
      if (target) {
        const observableObj = observable.object(data);
        if (!target.childNodes) {
          const observableArr = observable.array([observableObj]);
          target.childNodes = observableArr;
        } else {
          target.childNodes.push(observableObj);
        }
      }
    },
    /**
     * @description move node in a sortable container
     */
    movePos(parentId: string, from: string, to: string) {
      const parent = this.nodeMap[parentId];
      if (!parent || !parent.childNodes) {
        throw new Error(`swap failed: node ${parentId} does not exist`);
      }
      const { childNodes } = parent;
      const fromIdx = findIndex(childNodes, ({ id }) => id === from);
      const toIdx = findIndex(childNodes, ({ id }) => id === to);
      if (fromIdx === -1 || toIdx === -1) {
        return;
      }
      const isAsceOrder = fromIdx < toIdx;
      transaction(() => {
        if (isAsceOrder) {
          for (let i = fromIdx; i < toIdx; i++) {
            swapPos(childNodes, i, i + 1);
          }
        } else {
          for (let i = fromIdx; i > toIdx; i--) {
            swapPos(childNodes, i, i - 1);
          }
        }
      });
    },
  }));
