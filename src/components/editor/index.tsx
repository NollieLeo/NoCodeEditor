import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { map, cloneDeep } from "lodash-es";
import { SchemaData, SiderDragCompInfo } from "./types";
import { COMPONENTS_INFO } from "./constants";
import { Pane } from "./components/Pane";
import { Siderbar } from "./components/Siderbar";
import { ComponentTypes } from "./types";
import { DndMonitor } from "./components/DndMonitor";
import { CompWrapper } from "./components/CompWrapper";
import { SiderBarDragOverlay } from "./components/SiderBarDragOverlay";
import { useBoardStore } from "./stores/BoardStore";
import { BoardContext } from "./context/BoardContext";

import "./index.scss";
import { PanDragOverlay } from "./components/PanDragOverlay";

export const Editor: FC<PropsWithChildren> = () => {
  const [activeSidebarComp, setActiveSidebarComp] =
    useState<SiderDragCompInfo>(); // only for fields from the sidebar

  const [activePanComp, setActivePanComp] = useState<string>();

  const boardStore = useBoardStore();

  const contextVal = useMemo(
    () => ({
      boardStore,
    }),
    [boardStore]
  );

  function handleDragStart(e: DragStartEvent) {
    const { active } = e;
    const activeCompInfo = active.data.current as any;
    if (activeCompInfo && activeCompInfo.fromSidebar) {
      setActiveSidebarComp(activeCompInfo);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.
      // currentDragFieldRef.current = {
      //   id: active.id,
      //   type,
      //   name: `${type}${fields.length + 1}`,
      //   parent: null,
      // };
      return;
    }
    setActivePanComp(String(active.id));
  }

  const renderComps = useCallback(
    (nodes: SchemaData[]) =>
      map(nodes.slice(), (value) => {
        const { type, id, children, data } = value;
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
            <Component
              {...data}
              children={children ? renderComps(children) : undefined}
            />
          </CompWrapper>
        );
      }),
    []
  );

  const comps = useMemo(() => {
    return renderComps(cloneDeep(boardStore.nodes));
  }, [renderComps, boardStore.nodes]);

  return (
    <div className="editor-wrapper">
      <BoardContext.Provider value={contextVal}>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={() => {
            setActiveSidebarComp(undefined);
            setActivePanComp(undefined);
          }}
        >
          <Siderbar />
          <Pane>{comps}</Pane>
          <DndMonitor />
          <SiderBarDragOverlay type={activeSidebarComp?.type} />
          <PanDragOverlay id={activePanComp} />
        </DndContext>
      </BoardContext.Provider>
    </div>
  );
};
