export const MOCK_METAS = {
  "79": {
    id: "79",
    type: "container",
    name: "容器",
    attrs: {
      style: {
        width: 720,
        height: 466,
        background: "#b4b4b4",
        position: "relative",
        display: "flex",
        overflow: "hidden",
        flexShrink: 0,
        placeContent: "baseline start",
        flexFlow: "wrap",
      },
    },
    parentId: "page-1",
    childsId: ["448", "836", "1451", "1839", "2049", "646"],
  },
  "448": {
    id: "448",
    type: "conditional-container",
    name: "条件容器",
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
    parentId: "79",
    childsId: ["449", "450"],
  },
  "449": {
    id: "449",
    type: "blank-container",
    name: "Loading",
    attrs: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        flexFlow: "wrap",
        placeContent: "baseline start",
        background: "#dddddd",
      },
    },
    parentId: "448",
    childsId: ["1143", "1252"],
  },
  "450": {
    id: "450",
    type: "blank-container",
    name: "条件1",
    attrs: {
      style: {
        width: "100%",
        height: "100%",
        display: "none",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        flexFlow: "wrap",
        placeContent: "baseline start",
        background: "#aeeddcb3",
      },
    },
    parentId: "448",
    childsId: ["521", "1017"],
  },
  "521": {
    id: "521",
    type: "text",
    name: "文本",
    attrs: {
      style: {
        display: "block",
        flexShrink: 0,
        height: "32px",
      },
      children: "旋转跳跃我闭着眼",
    },
    parentId: "450",
  },
  "646": {
    id: "646",
    type: "text",
    name: "文本",
    attrs: {
      style: {
        display: "block",
        flexShrink: 0,
        height: "32px",
      },
      children: "旋转跳跃我闭着眼",
    },
    parentId: "79",
  },
  "836": {
    id: "836",
    type: "button",
    name: "按钮",
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      children: "按钮",
    },
    parentId: "79",
  },
  "1017": {
    id: "1017",
    type: "button",
    name: "按钮",
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      children: "按钮",
    },
    parentId: "450",
  },
  "1143": {
    id: "1143",
    type: "text",
    name: "文本",
    attrs: {
      style: {
        display: "block",
        flexShrink: 0,
        height: "32px",
      },
      children: "旋转跳跃我闭着眼",
    },
    parentId: "449",
  },
  "1252": {
    id: "1252",
    type: "button",
    name: "按钮",
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      children: "按钮",
    },
    parentId: "449",
  },
  "1451": {
    id: "1451",
    type: "text",
    name: "文本",
    attrs: {
      style: {
        display: "block",
        flexShrink: 0,
        height: "32px",
      },
      children: "旋转跳跃我闭着眼",
    },
    parentId: "79",
  },
  "1839": {
    id: "1839",
    type: "button",
    name: "按钮",
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      children: "按钮",
    },
    parentId: "79",
  },
  "2049": {
    id: "2049",
    type: "select",
    name: "选择框",
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      placeholder: "选择框",
    },
    parentId: "79",
  },
  "page-1": {
    type: "page",
    id: "page-1",
    parentId: null,
    attrs: {
      style: {
        width: "1440px",
        height: "1080px",
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
    childsId: ["79"],
  },
} as any;

export const MOCK_SCOPE = {
  Web: {
    width: 1440,
    height: 1080,
  },
  // "iPhone 14 Pro Max": {
  //   width: 430,
  //   height: 932,
  // },
  // "iPad Mini": {
  //   width: 768,
  //   height: 1024,
  // },
  // "iPad Pro": {
  //   width: 1024,
  //   height: 1366,
  // },
};
