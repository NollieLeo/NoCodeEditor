import { ClientRect } from "@dnd-kit/core";
import { ComponentTypes } from "./Components";

/** 拖拽的元素的来源 */
export enum DragOrigin {
  /** 来源侧边栏 拖拽添加 */
  SIDE_ADD = "sideAdd",
  /** 来源面板 拖拽排序 */
  PAN_SORT = "panSort",
}

export interface DragInfoDefault {
  from: DragOrigin;
  id: string;
  rect: ClientRect | null;
}

export interface DragInfoFromSideAdd extends DragInfoDefault {
  type: ComponentTypes;
  name: string;
  from: DragOrigin.SIDE_ADD;
}

export interface DragInfoFromPanSort extends DragInfoDefault {
  parentId?: string | null;
  from: DragOrigin.PAN_SORT;
}

export type DragInfo = DragInfoFromSideAdd | DragInfoFromPanSort;

export interface DropInfo {
  parentId?: string | null;
  rect: ClientRect | null;
  id: string;
  accepts?: string[];
}
