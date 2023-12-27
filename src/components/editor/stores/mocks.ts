export const mocks = {
  "page-1": {
    type: "page",
    id: "page-1",
    parentId: null,
    data: {
      style: {
        width: "1280px",
        height: "720px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      },
    },
    childNodes: ["container-287", "container-433"],
  },
  "container-287": {
    id: "container-287",
    parentId: "page-1",
    type: "container",
    data: {
      style: {
        width: "fit-content",
        height: 500,
        background: "#64bb64",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      },
    },
    childNodes: [
      "container-257",
      "container-560",
      "container-299",
      "container-621",
      "container-1106",
    ],
  },
  "container-257": {
    id: "container-257",
    parentId: "container-287",
    type: "container",
    data: {
      style: {
        width: 100,
        height: 50,
        background: "pink",
        display: "block",
      },
    },
    childNodes: [],
  },
  "container-560": {
    id: "container-560",
    parentId: "container-287",
    type: "container",
    data: {
      style: {
        width: 200,
        height: 100,
        background: "blue",
        display: "block",
      },
    },
    childNodes: [],
  },
  "container-621": {
    id: "container-621",
    parentId: "container-287",
    type: "container",
    data: {
      style: {
        width: 350,
        height: 200,
        background: "#666",
        display: "block",
      },
    },
    childNodes: [],
  },
  "container-1106": {
    id: "container-1106",
    parentId: "container-287",
    type: "container",
    data: {
      style: {
        width: 150,
        height: 200,
        background: "#fff",
        display: "block",
      },
    },
    childNodes: [],
  },
  "container-299": {
    id: "container-299",
    parentId: "container-287",
    type: "container",
    data: {
      style: {
        width: 300,
        height: 200,
        background: "purple",
        display: "block",
      },
    },
    childNodes: [],
  },
  "container-433": {
    id: "container-433",
    parentId: "page-1",
    type: "container",
    data: {
      style: {
        width: 500,
        height: 200,
        background: "yellow",
        display: "flex",
        flexWrap: "wrap",
      },
    },
    childNodes: ["button-2454", "text-4365", "textarea-4918"],
  },
  "button-2454": {
    id: "button-2454",
    parentId: "container-433",
    type: "button",
    data: {
      style: {
        width: 120,
        height: 32,
        display: "block",
      },
      children: "按钮",
    },
  },
  "text-4365": {
    id: "text-4365",
    parentId: "container-433",
    type: "text",
    data: {
      style: {
        display: "block",
      },
      children: "Go fuck yourself",
    },
  },
  "textarea-4918": {
    id: "textarea-4918",
    parentId: "container-433",
    type: "textarea",
    data: {
      style: {
        width: 120,
        height: 32,
        display: "block",
      },
      placeholder: "输入框",
    },
  },
} as any;
