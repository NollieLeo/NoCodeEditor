export const mocks = {
  "page-1": {
    type: "page",
    id: "page-1",
    parentId: null,
    attrs: {
      style: {
        width: "1280px",
        height: "720px",
        background: "#fff",
        display: "flex",
        flexDirection: "row",
        flexShrink: 0,
        flexWrap: "wrap",
        position: "relative",
        overflow: "hidden",
        placeContent: "baseline",
      },
    },
    childsId: ["759", "588", "412", "338", "253", "183", "56"],
  },
  "56": {
    parentId: "page-1",
    id: "56",
    type: "container",
    childsId: null,
    attrs: {
      style: {
        width: 350,
        height: 200,
        background: "#7232d1",
        display: "flex",
        overflow: "hidden",
        flexShrink: 0,
        placeContent: "baseline start",
        flexFlow: "wrap",
      },
    },
  },
  "183": {
    parentId: "page-1",
    id: "183",
    type: "text",
    childsId: null,
    attrs: {
      style: {
        display: "block",
        flexShrink: 0,
      },
      children: "Go fuck yourself",
    },
  },
  "253": {
    parentId: "page-1",
    id: "253",
    type: "select",
    childsId: null,
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
  "338": {
    parentId: "page-1",
    id: "338",
    type: "text",
    childsId: null,
    attrs: {
      style: {
        display: "block",
        flexShrink: 0,
      },
      children: "Go fuck yourself",
    },
  },
  "412": {
    parentId: "page-1",
    id: "412",
    type: "container",
    childsId: null,
    attrs: {
      style: {
        width: 200,
        height: 200,
        background: "red",
        display: "flex",
        overflow: "hidden",
        flexShrink: 0,
        placeContent: "baseline start",
        flexFlow: "wrap",
        position: "absolute",
        top: 100,
        left: 200,
      },
    },
  },
  "588": {
    parentId: "page-1",
    id: "588",
    type: "input",
    childsId: null,
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
  "759": {
    parentId: "page-1",
    id: "759",
    type: "button",
    childsId: null,
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
} as any;

export const MOCK_SCOPE = {
  Web: {
    width: 1440,
    height: 1080,
  },
  "iPhone XR": {
    width: 414,
    height: 896,
  },
  "iPhone 14 Pro Max": {
    width: 430,
    height: 932,
  },
  "iPad Mini": {
    width: 768,
    height: 1024,
  },
  "iPad Pro": {
    width: 1024,
    height: 1366,
  },
};
