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
        width: 400,
        height: 150,
        background: "green",
        display: "flex",
        flexWrap: "wrap",
      },
    },
    childNodes: ["textarea-194", "text-145", "input-284", "button-580"],
  },
  "textarea-194": {
    id: "textarea-194",
    parentId: "container-93",
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
  "text-145": {
    id: "text-145",
    parentId: "container-93",
    type: "text",
    data: {
      style: {
        display: "block",
      },
      children: "Go fuck yourself",
    },
  },
  "input-284": {
    id: "input-284",
    parentId: "container-93",
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
  "button-580": {
    id: "button-580",
    parentId: "container-93",
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
} as any;
