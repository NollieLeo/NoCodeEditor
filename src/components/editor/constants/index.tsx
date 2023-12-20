import { Button } from "../components/Comps/Button";
import { Container } from "../components/Comps/Container";
import { Input } from "../components/Comps/Input";
import { Page } from "../components/Comps/Page";
import { Textarea } from "../components/Comps/Textarea";
import { ComponentTypes } from "../types";

export const COMPONENTS_INFO = {
  [ComponentTypes.BUTTON]: {
    name: "按钮",
    type: ComponentTypes.BUTTON,
    render: Button,
    defaultData: {
      style: {
        width: 120,
        height: 32,
      },
      children: "按钮",
    },
  },
  [ComponentTypes.INPUT]: {
    name: "输入框",
    render: Input,
    type: ComponentTypes.INPUT,
    defaultData: {
      style: {
        width: 120,
        height: 32,
      },
      placeholder: "输入框",
    },
  },
  [ComponentTypes.TEXTAREA]: {
    name: "长文本输入框",
    render: Textarea,
    type: ComponentTypes.TEXTAREA,
    defaultData: {
      style: {
        width: 120,
        height: 32,
      },
      placeholder: "输入框",
    },
  },
  [ComponentTypes.CONTAINER]: {
    name: "容器",
    render: Container,
    type: ComponentTypes.CONTAINER,
    defaultData: {
      style: {
        width: 400,
        height: 150,
        background: "red",
      },
    },
  },
  [ComponentTypes.PAGE]: {
    name: "页面",
    render: Page,
    type: ComponentTypes.PAGE,
    defaultData: {
      style: {
        width: 1280,
        height: 720,
        background: "#fff",
      },
    },
  },
} as const;
