import {
  FC,
  memo,
  useCallback,
  useDeferredValue,
  PropsWithChildren,
} from "react";
import { DndContext } from "@dnd-kit/core";
import { map } from "lodash-es";
import { toJS } from "mobx";
import { SchemaData } from "./types";
import { COMPONENTS_INFO } from "./constants";
import { ZoomPan } from "./components/ZoomPan";
import { Siderbar } from "./components/Siderbar";
import { ComponentTypes } from "./types";
import { DndMonitor } from "./components/DndMonitor";
import { CompWrapper } from "./components/CompWrapper";
import { observer } from "mobx-react-lite";
import useEditorDndSensors from "./hooks/useEditorDndSensors";
import { useEditorContext } from "./hooks/useEditorContext";
import { DndDragOverlay } from "./components/DndDragOverlay";
import useEditorDnd from "./hooks/useEditorDnd";

import "./Content.scss";

const ContentComp: FC<PropsWithChildren> = observer(() => {
  const sensors = useEditorDndSensors();
  const { editorStore } = useEditorContext();
  const { onDragStart, onDragEnd, onDragOver } = useEditorDnd();
  const defferedNodes = useDeferredValue(toJS(editorStore.nodes));

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
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="editor-wrapper">
        {/* --------- Siderbar for editor --------- */}
        <Siderbar />
        {/* --------- Editor's zoom pan */}
        <ZoomPan>{renderComps(defferedNodes)}</ZoomPan>
        {/* --------- Dnd overlays for editor's global drag overlay  ---------- */}
        <DndDragOverlay />
      </div>
      {/* --------- Dnd monitor for editor's global Dnd events  ---------- */}
      <DndMonitor />
    </DndContext>
  );
});

export const Content = memo(ContentComp);
