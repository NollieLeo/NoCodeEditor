import { observer } from "mobx-react-lite";
import { useBoardContext } from "../../hooks/useBoardContext";
import "./index.scss";
import { memo, useMemo, useRef } from "react";

export const ToolsComps = observer(() => {
  const { boardStore } = useBoardContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const overNodeBorder = useMemo(() => {
    if (boardStore?.overNode) {
      const { id } = boardStore.overNode;
      const overDom = document.getElementById(String(id));
      if (overDom && wrapperRef.current) {
        const { width, height, top, bottom, left } =
          overDom.getBoundingClientRect();
        const { left: wrapperLeft } =
          wrapperRef.current.getBoundingClientRect();
        return (
          <div
            style={{
              position: "absolute",
              border: "1px solid red",
              boxSizing: "border-box",
              width,
              height,
              top,
              bottom,
              left: left - wrapperLeft,
              zIndex: 3,
            }}
          />
        );
      }
    }
  }, [boardStore.overNode]);

  const activeNodeBorder = useMemo(() => {
    if (boardStore.activeNodeId) {
      const activeNodeDom = document.getElementById(
        String(boardStore.activeNodeId)
      );
      if (activeNodeDom && wrapperRef.current) {
        const { width, height, top, bottom, left } =
          activeNodeDom.getBoundingClientRect();
        const { left: wrapperLeft } =
          wrapperRef.current.getBoundingClientRect();
        return (
          <div
            style={{
              position: "absolute",
              border: "1px solid blue",
              boxSizing: "border-box",
              width,
              height,
              top,
              bottom,
              pointerEvents: "none",
              left: left - wrapperLeft,
              zIndex: 1,
            }}
          />
        );
      }
    }
  }, [boardStore.activeNodeId, boardStore.panState]);

  const hoverdNodeBorder = useMemo(() => {
    if (boardStore.hoveredNodeId) {
      const hoveredNodeDom = document.getElementById(
        String(boardStore.hoveredNodeId)
      );
      if (hoveredNodeDom && wrapperRef.current) {
        const { width, height, top, bottom, left } =
          hoveredNodeDom.getBoundingClientRect();
        const { left: wrapperLeft } =
          wrapperRef.current.getBoundingClientRect();
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            style={{
              position: "absolute",
              boxSizing: "border-box",
              width,
              height,
              top,
              bottom,
              pointerEvents: "none",
              left: left - wrapperLeft,
              zIndex: 9999,
            }}
          >
            <line
              x1={0}
              x2={width}
              y1={0}
              y2={0}
              stroke="blue"
              strokeWidth="2"
              strokeLinecap="square"
              strokeDasharray="4 4"
            />
            <line
              x1={width}
              x2={width}
              y1={0}
              y2={height}
              stroke="blue"
              strokeWidth="2"
              strokeLinecap="square"
              strokeDasharray="4 4"
            />
            <line
              x1={width}
              x2={0}
              y1={height}
              y2={height}
              stroke="blue"
              strokeWidth="2"
              strokeLinecap="square"
              strokeDasharray="4 4"
            />
            <line
              x1={0}
              x2={0}
              y1={height}
              y2={0}
              stroke="blue"
              strokeWidth="2"
              strokeLinecap="square"
              strokeDasharray="4 4"
            />
          </svg>
        );
      }
    }
  }, [boardStore.hoveredNodeId, boardStore.panState]);

  return (
    <div className="tools-wrapper" ref={wrapperRef}>
      {overNodeBorder}
      {activeNodeBorder}
      {hoverdNodeBorder}
    </div>
  );
});


export const Tools = memo(ToolsComps)