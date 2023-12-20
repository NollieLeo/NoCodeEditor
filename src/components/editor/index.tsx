import {
  CSSProperties,
  FC,
  PropsWithChildren,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from "react";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { map } from "lodash-es";
import { toJS } from "mobx";
import { SchemaData, SiderDragCompInfo } from "./types";
import { COMPONENTS_INFO } from "./constants";
import { Pane } from "./components/Pane";
import { Siderbar } from "./components/Siderbar";
import { ComponentTypes } from "./types";
import { DndMonitor } from "./components/DndMonitor";
import { CompWrapper } from "./components/CompWrapper";
import { SiderBarDragOverlayComp } from "./components/SiderBarDragOverlayComp";
import { useBoardStore } from "./stores/BoardStore";
import { BoardContext } from "./context/BoardContext";
import { PanDragOverlayComp } from "./components/PanDragOverlayComp";
import { observer } from "mobx-react-lite";
import useBoardSensors from "./hooks/useBoardSensors";
import "./index.scss";

const dragOverlayStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
};

export const Editor: FC<PropsWithChildren> = observer(() => {
  const [activeSidebarComp, setActiveSidebarComp] =
    useState<SiderDragCompInfo>();

  const [activePanComp, setActivePanComp] = useState<string>();

  const boardStore = useBoardStore();

  const sensors = useBoardSensors();

  const contextVal = useMemo(
    () => ({
      boardStore,
    }),
    [boardStore]
  );

  const defferedNodes = useDeferredValue(toJS(boardStore.nodes));

  function handleDragStart(e: DragStartEvent) {
    const { active } = e;
    const activeCompInfo = active.data.current as any;
    if (activeCompInfo && activeCompInfo.fromSidebar) {
      setActiveSidebarComp(activeCompInfo);
      return;
    }
    setActivePanComp(String(active.id));
  }

  const renderComps = useCallback(
    (nodes: SchemaData[]) =>
      map(nodes.slice(), (value) => {
        const { type, id, childNodes, data } = value;
        const { render: Component } = COMPONENTS_INFO[type];
        return (
          <CompWrapper
            key={id}
            id={id}
            droppable={[ComponentTypes.PAGE, ComponentTypes.CONTAINER].includes(
              type
            )}
            draggable={type !== ComponentTypes.PAGE}
          >
            {(params) => (
              <Component
                {...data}
                {...params}
                children={
                  childNodes?.length ? renderComps(childNodes) : data.children
                }
              />
            )}
          </CompWrapper>
        );
      }),
    []
  );

  return (
    <div className="editor-wrapper">
      <BoardContext.Provider value={contextVal}>
        <DndContext
          onDragStart={handleDragStart}
          sensors={sensors}
          onDragEnd={() => {
            setActiveSidebarComp(undefined);
            setActivePanComp(undefined);
          }}
        >
          <Siderbar />
          <Pane>{renderComps(defferedNodes)}</Pane>
          <DndMonitor />
          <DragOverlay
            dropAnimation={null}
            adjustScale={false}
            style={dragOverlayStyle}
            modifiers={[snapCenterToCursor]}
          >
            <SiderBarDragOverlayComp type={activeSidebarComp?.type} />
            <PanDragOverlayComp id={activePanComp} />
          </DragOverlay>
        </DndContext>
      </BoardContext.Provider>
    </div>
  );
});
