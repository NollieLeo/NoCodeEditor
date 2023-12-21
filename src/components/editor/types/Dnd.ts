import { ComponentTypes } from "./Components";

/** 拖拽的元素的来源 */
export enum DragOrigin {
  /** 来源侧边栏 拖拽添加 */
  SIDE_ADD = "addFromSide",
  /** 来源面板 拖拽 */
  PAN = "dragFromPan",
}

export interface DragTargetDefault {
  from: DragOrigin;
}

export interface DragTargetFromSide extends DragTargetDefault {
  componentType: ComponentTypes;
  componentName: string;
  from: DragOrigin.SIDE_ADD;
}

export interface DragTargetFromPan extends DragTargetDefault {
  componentType: ComponentTypes;
  componentId: string;
  from: DragOrigin.PAN;
}

export type DragTarget = DragTargetFromSide | DragTargetFromPan;
