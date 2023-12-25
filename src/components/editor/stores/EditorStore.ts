import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
import { useLocalStore } from "mobx-react-lite";
import { observable, transaction } from "mobx";
import { cloneDeep, findIndex, forEach } from "lodash-es";
import { DragInfo, DropInfo, SchemaData } from "../types";
import { mock } from "./mock";
import { swapPos } from "./utils/swapPos";

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
  nodes: SchemaData[];
  nodeMap: Record<string, SchemaData>;
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
  const generate = (datas: SchemaData[]) => {
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
    generateNodesMap(datas, null);
    return map;
  };

  return useLocalStore<EditorStore>(() => ({
    overInfo: null,
    focusedNodeId: null,
    hoveredNodeId: null,
    panState: null,
    draggingInfo: null,
    nodes: cloneDeep(mock),
    get nodeMap() {
      return generate(this.nodes);
    },
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
      if (from === to) {
        return;
      }
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
};
