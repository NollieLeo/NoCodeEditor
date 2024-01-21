import {
  Textarea,
  Container,
  Button,
  Input,
  Select,
  Text,
  ConditionalContainer,
} from "../components/MetaComponents";
import { ComponentTypes } from "../types";

export const DATA_COMPONENT_ID = "data-component-id";
export const DATA_COMPONENT_TYPE = "data-component-type";

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
      children: "Go fuck yourself",
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
        background: (function () {
          return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        })(),
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
        width: 300,
        height: 150,
        background: "green",
        display: "flex",
        flexShrink: 0,
        position: "absolute",
        top: 0,
        left: 0,
      },
    },
  },
} as const;
