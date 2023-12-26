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
        gap: "20px",
      },
    },
    childNodes: ["input-438", "container-561", "text-321", "container-93"],
  },
  "container-93": {
    id: "container-93",
    parentId: "page-1",
    type: "container",
    data: {
      style: {
        width: 500,
        gap: "10px",
        height: 150,
        background: "#fff",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(150px, 1fr))",
        gridTemplateRows: "repeat(2, minmax(0px, 1fr))",
      },
    },
    childNodes: [
      "container-193",
      "container-1966",
      "container-19662",
      "container-29662",
    ],
  },
  "text-321": {
    id: "text-321",
    parentId: "page-1",
    type: "text",
    data: {
      style: {
        display: "block",
      },
      children: "Go fuck yourself",
    },
  },
  "input-438": {
    id: "input-438",
    parentId: "page-1",
    type: "input",
    data: {
      style: {
        width: 120,
        height: 32,
        display: "block",
      },
      placeholder: "输入框",
    },
  },
  "container-561": {
    id: "container-561",
    parentId: "page-1",
    type: "container",
    data: {
      style: {
        width: 160,
        height: 200,
        background: "#666",
        display: "block",
      },
    },
    childNodes: ["button-665", "text-774", "input-935"],
  },
  "button-665": {
    id: "button-665",
    parentId: "container-561",
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
  "text-774": {
    id: "text-774",
    parentId: "container-561",
    type: "text",
    data: {
      style: {
        display: "block",
      },
      children: "Go fuck yourself",
    },
  },
  "input-935": {
    id: "input-935",
    parentId: "container-561",
    type: "input",
    data: {
      style: {
        width: 120,
        height: 32,
        display: "block",
      },
      placeholder: "输入框",
    },
  },
  "container-193": {
    id: "container-193",
    parentId: "container-93",
    type: "container",
    data: {
      style: {
        width: "100%",
        height: "100%",
        background: "blue",
        display: "block",
      },
    },
    childNodes: [],
  },
  "container-1966": {
    id: "container-1966",
    parentId: "container-93",
    type: "container",
    data: {
      style: {
        width: "100%",
        height: "100%",
        background: "#666",
        display: "block",
      },
    },
    childNodes: [],
  },
  "container-19662": {
    id: "container-19662",
    parentId: "container-93",
    type: "container",
    data: {
      style: {
        width: "100%",
        height: "100%",
        background: "green",
        display: "block",
      },
    },
    childNodes: [],
  },
  "container-29662": {
    id: "container-29662",
    parentId: "container-93",
    type: "container",
    data: {
      style: {
        width: "100%",
        height: "100%",
        background: "#40b6cd",
        display: "block",
      },
    },
    childNodes: [],
  },
} as any;
