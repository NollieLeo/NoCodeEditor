import { Over } from "@dnd-kit/core";
import { useLocalStore } from "mobx-react-lite";
import { forEach, remove } from "lodash-es";
import { toJS } from "mobx";
import { SchemaData } from "../types";
import { mock } from "./mock";

export interface BoardState {
  overNode: Over | null;
  nodes: SchemaData[];
  nodeMap: Record<string, SchemaData>;
}

export interface BoardAction {
  setOverNode(over: BoardState["overNode"]): void;
  createNewNode(data: SchemaData, target: string): void;
  moveNodeTo(from: string, to: string): void;
}

export type BoardStore = BoardState & BoardAction;

export const useBoardStore = () => {
  return useLocalStore<BoardStore>(() => ({
    overNode: null,
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
      console.log("map", map);
      return map;
    },
    setOverNode(over: Over) {
      this.overNode = over;
    },
    createNewNode(data: SchemaData, targetId: string) {
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
