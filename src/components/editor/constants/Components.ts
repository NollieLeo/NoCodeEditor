import {
  Textarea,
  Container,
  Button,
  Input,
  Select,
  Text,
  ConditionalContainer,
  BlankContainer,
} from "../components/MetaComponents";
import { ComponentTypes } from "../types";

export const DATA_COMPONENT_ID = "data-component-id";
export const DATA_COMPONENT_TYPE = "data-component-type";
export const DATA_COMPONENT_OVERLAY_ID = "data-overlay-id";

export const COMPONENTS_INFO = {
  [ComponentTypes.BUTTON]: {
    name: "按钮",
    type: ComponentTypes.BUTTON,
    render: Button,
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      children: "按钮",
    },
  },
  [ComponentTypes.TEXT]: {
    name: "文本",
    type: ComponentTypes.TEXT,
    render: Text,
    attrs: {
      style: {
        display: "block",
        flexShrink: 0,
        height: "32px",
      },
      children: "旋转跳跃我闭着眼",
    },
  },
  [ComponentTypes.INPUT]: {
    name: "输入框",
    render: Input,
    type: ComponentTypes.INPUT,
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      placeholder: "输入框",
    },
  },
  [ComponentTypes.TEXTAREA]: {
    name: "长文本输入框",
    render: Textarea,
    type: ComponentTypes.TEXTAREA,
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      placeholder: "输入框",
    },
  },
  [ComponentTypes.SELECT]: {
    name: "选择框",
    render: Select,
    type: ComponentTypes.SELECT,
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      placeholder: "选择框",
    },
  },
  [ComponentTypes.CONTAINER]: {
    name: "容器",
    render: Container,
    type: ComponentTypes.CONTAINER,
    attrs: {
      style: {
        width: 350,
        height: 200,
        background: "#b4b4b4",
        position: "relative",
        display: "flex",
        overflow: "hidden",
        flexShrink: 0,
        placeContent: "baseline start",
        flexFlow: "wrap",
      },
    },
  },
  [ComponentTypes.PAGE]: {
    name: "页面",
    render: Container,
    type: ComponentTypes.PAGE,
    attrs: {
      style: {
        width: 1280,
        height: 720,
        background: "#fff",
        display: "flex",
        flexShrink: 0,
      },
    },
  },
  [ComponentTypes.CONDITIONAL_CONTAINER]: {
    name: "条件容器",
    render: ConditionalContainer,
    type: ComponentTypes.CONDITIONAL_CONTAINER,
    attrs: {
      style: {
        width: 400,
        height: 200,
        background: "rgb(243, 243, 243)",
        display: "flex",
        flexShrink: 0,
        overflow: "hidden",
      },
    },
  },
  [ComponentTypes.BLANK_CONTAINER]: {
    name: "空容器",
    render: BlankContainer,
    type: ComponentTypes.BLANK_CONTAINER,
    attrs: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      },
    },
  },
} as const;

export const DRAGGABLE_COMPONENTS = [
  ComponentTypes.BUTTON,
  ComponentTypes.INPUT,
  ComponentTypes.TEXTAREA,
  ComponentTypes.TEXT,
  ComponentTypes.SELECT,
  ComponentTypes.INPUT,
  ComponentTypes.CONTAINER,
  ComponentTypes.CONDITIONAL_CONTAINER,
];

export const DROPPABLE_COMPONENTS = [
  ComponentTypes.CONTAINER,
  ComponentTypes.BLANK_CONTAINER,
  ComponentTypes.PAGE,
];
