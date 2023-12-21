import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
import { useLocalStore } from "mobx-react-lite";
import { forEach, remove } from "lodash-es";
import { toJS } from "mobx";
import { DragTarget, SchemaData } from "../types";
import { mock } from "./mock";

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
  draggingNode: DragTarget | null;
  nodes: SchemaData[];
  nodeMap: Record<string, SchemaData>;
}

export interface EditorAction {
  setOverNodeId(over: EditorState["overNodeId"]): void;
  setFocusedNodeId(id: EditorState["focusedNodeId"]): void;
  setHoverNodeId(id: EditorState["hoveredNodeId"]): void;
  setPanState(panState: EditorState["panState"]): void;
  setDraggingNode(node: EditorState["draggingNode"]): void;
  createNewNode(data: SchemaData, target: string): void;
  moveNodeTo(from: string, to: string): void;
  cleanUpHelperNode(): void;
}

export type EditorStore = EditorState & EditorAction;

export const useEditorStore = () =>
  useLocalStore<EditorStore>(() => ({
    overNodeId: null,
    focusedNodeId: null,
    hoveredNodeId: null,
    panState: null,
    draggingNode: null,
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
    setDraggingNode(node) {
      this.draggingNode = node;
    },
    cleanUpHelperNode() {
      this.hoveredNodeId = null;
      this.focusedNodeId = null;
      this.overNodeId = null;
    },
    createNewNode(data, targetId) {
      const target = this.nodeMap[targetId];
      if (target) {
        if (!target.childNodes) {
          target.childNodes = [data];
        } else {
          target.childNodes.push(data);
        }
      }
    },
    moveNodeTo(from: string, to: string) {
      const origin = this.nodeMap[from];
      const target = this.nodeMap[to];
      if (origin.parentId) {
        const childs = this.nodeMap[origin.parentId].childNodes;
        if (childs && childs.length) {
          const [removedNode] = remove(childs, (n) => n.id === origin.id);
          if (!target.childNodes) {
            target.childNodes = [toJS(removedNode)];
          } else {
            target.childNodes.push(toJS(removedNode));
          }
        }
      }
    },
  }));
