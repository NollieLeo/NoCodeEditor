import { uniqueId } from "lodash-es";
import { COMPONENTS_INFO } from "../constants";
import { ComponentTypes } from "../types";

export function createNewNode(type: ComponentTypes, parentId: string) {
  const newNodeDefaultData = COMPONENTS_INFO[type];
  const newNodeId = `${type}-${uniqueId()}`;
  const newNode: any = {
    id: newNodeId,
    parentId,
    type: type,
    data: newNodeDefaultData.defaultData,
  };
  if ([ComponentTypes.CONTAINER].includes(type)) {
    newNode.childsId = [];
  }
  return newNode;
}
