export const MOCK_METAS = {
  "58": {
    id: "58",
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
    parentId: "page-1",
    childsId: ["59", "60"],
  },
  "59": {
    id: "59",
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
    parentId: "58",
    childsId: [],
  },
  "60": {
    id: "60",
    type: "blank-container",
    name: "条件1",
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
        background: "#aeeddcb3",
      },
    },
    parentId: "58",
    childsId: [],
  },
  "page-1": {
    type: "page",
    id: "page-1",
    parentId: null,
    name: "页面",
    attrs: {
      style: {
        width: "1440px",
        height: "1080px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        flexWrap: "wrap",
        position: "relative",
        overflow: "hidden",
        placeContent: "baseline",
      },
    },
    childsId: ["58"],
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
