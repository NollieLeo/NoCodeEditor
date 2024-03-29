import { ComponentTypes } from "./Components";

/** 拖拽的元素的来源 */
export enum DragOrigin {
  /** 来源侧边栏 拖拽添加 */
  SIDE_ADD = "sideAdd",
  /** 来源面板 拖拽排序，在Flex布局容器中做排序 */
  SORT = "sort",
  /** 来源面板 拖拽位移，元素本身position为fixed/absolute */
  MOVE = "move",
}

export interface DragInfoDefault {
  from: DragOrigin;
  id: string;
}

export interface DragInfoFromSideAdd extends DragInfoDefault {
  type: ComponentTypes;
  from: DragOrigin.SIDE_ADD;
}

export interface DragInfoFromPanSort extends DragInfoDefault {
  from: DragOrigin.SORT;
}

export interface DragInfoFromPanMove extends DragInfoDefault {
  from: DragOrigin.MOVE;
}

export type DragInfo = DragInfoFromSideAdd | DragInfoFromPanSort | DragInfoFromPanMove;

export interface DropInfo {
  id: string;
}
