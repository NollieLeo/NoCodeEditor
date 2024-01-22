export const MOCK_METAS = {
  "281": {
    id: "281",
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
    parentId: "page-1",
  },
  "354": {
    id: "354",
    type: "input",
    name: "输入框",
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
      },
      placeholder: "输入框",
    },
    parentId: "page-1",
  },
  "444": {
    id: "444",
    type: "text",
    name: "文本",
    attrs: {
      style: {
        display: "block",
        flexShrink: 0,
        height: "32px",
      },
      children: "Go fuck yourself",
    },
    parentId: "page-1",
  },
  "727": {
    id: "727",
    type: "container",
    name: "容器",
    attrs: {
      style: {
        width: 350,
        height: 200,
        background: "#b4b4b4",
        position: "absolute",
        display: "flex",
        overflow: "hidden",
        flexShrink: 0,
        placeContent: "baseline start",
        flexFlow: "wrap",
        left: 82,
        top: 658,
      },
    },
    parentId: "page-1",
    childsId: [],
  },
  "927": {
    id: "927",
    type: "select",
    name: "选择框",
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
        left: 137,
        top: 228,
        position: "absolute",
      },
      placeholder: "选择框",
    },
    parentId: "page-1",
  },
  "1194": {
    id: "1194",
    type: "container",
    name: "容器",
    attrs: {
      style: {
        width: 350,
        height: 200,
        background: "#b4b4b4",
        position: "absolute",
        display: "flex",
        overflow: "hidden",
        flexShrink: 0,
        placeContent: "baseline start",
        flexFlow: "wrap",
        left: 539,
        top: 354,
      },
    },
    parentId: "page-1",
    childsId: [],
  },
  "1375": {
    id: "1375",
    type: "textarea",
    name: "长文本输入框",
    attrs: {
      style: {
        width: 120,
        height: 32,
        display: "block",
        flexShrink: 0,
        left: 124,
        top: 425,
        position: "absolute",
      },
      placeholder: "输入框",
    },
    parentId: "page-1",
  },
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
    childsId: ["281", "354", "727", "927", "1194", "1375", "444"],
  },
} as any;

export const MOCK_SCOPE = {
  Web: {
    width: 1440,
    height: 1080,
  },
  // "iPhone XR": {
  //   width: 414,
  //   height: 896,
  // },
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
