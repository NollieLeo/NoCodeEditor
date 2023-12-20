import { Over } from "@dnd-kit/core";
import { useLocalStore } from "mobx-react-lite";
import { forEach } from "lodash-es";
import { toJS } from "mobx";
import { ComponentTypes, SchemaData } from "../types";

export interface BoardState {
  overNode: Over | null;
  nodes: SchemaData[];
  nodeMap: Record<string, SchemaData>;
}

export interface BoardAction {
  setOverNode(over: BoardState["overNode"]): void;
}

export const mock = [
  {
    type: ComponentTypes.PAGE,
    id: "page-1",
    data: {
      style: {
        width: "1280px",
        height: "720px",
        background: "#fff",
      },
    },
    children: [
      {
        type: ComponentTypes.CONTAINER,
        id: "container-1",
        data: {
          style: {
            width: "400px",
            height: "200px",
            background: "green",
          },
        },
        children: [
          {
            type: ComponentTypes.INPUT,
            id: "input-1",
            data: {
              style: {
                width: "100px",
                height: "36px",
              },
              defaultValue: "撒打算大撒",
            },
          },
        ],
      },
      {
        type: ComponentTypes.INPUT,
        id: "input-2",
        data: {
          style: {
            width: "100px",
            height: "36px",
          },
          placeholder: "我是谁",
        },
      },
    ],
  },
];

export type BoardStore = BoardState & BoardAction;

export const useBoardStore = () => {
  return useLocalStore<BoardStore>(() => ({
    overNode: null,
    nodes: mock,
    get nodeMap() {
      const map: Record<string, SchemaData> = {};
      const generateNodesMap = (nodes: SchemaData[]) => {
        forEach(nodes, (value) => {
          map[value.id] = value;
          if (value.children) {
            generateNodesMap(value.children);
          }
        });
      };
      generateNodesMap(toJS(this.nodes));
      return map;
    },
    setOverNode(over: Over) {
      this.overNode = over;
    },
  }));
};
