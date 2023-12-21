import { Over } from "@dnd-kit/core";
import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
import { useLocalStore } from "mobx-react-lite";
import { forEach, remove } from "lodash-es";
import { toJS } from "mobx";
import { SchemaData } from "../types";
import { mock } from "./mock";

export interface BoardState {
  overNode: Over | null;
  nodes: SchemaData[];
  nodeMap: Record<string, SchemaData>;
  activeNodeId: string | null;
  hoveredNodeId: string | null;
  panState: Omit<ReactZoomPanPinchState, "previousScale"> | null;
}

export interface BoardAction {
  createNewNode(data: SchemaData, target: string): void;
  moveNodeTo(from: string, to: string): void;
  setOverNode(over: BoardState["overNode"]): void;
  setActiveNodeId(id: BoardState["activeNodeId"]): void;
  setHoverNodeId(id: BoardState["hoveredNodeId"]): void;
  setPanState(panState: BoardState["panState"]): void;
  cleanUpHelperNode(): void;
}

export type BoardStore = BoardState & BoardAction;

export const useBoardStore = () => {
  return useLocalStore<BoardStore>(() => ({
    overNode: null,
    activeNodeId: null,
    hoveredNodeId: null,
    panState: null,
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
    setOverNode(over) {
      this.overNode = over;
    },
    setActiveNodeId(id) {
      this.activeNodeId = id;
    },
    setHoverNodeId(id) {
      this.hoveredNodeId = id;
    },
    setPanState(state) {
      this.panState = state;
    },
    cleanUpHelperNode() {
      this.hoveredNodeId = null;
      this.activeNodeId = null;
      this.overNode = null;
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
};
