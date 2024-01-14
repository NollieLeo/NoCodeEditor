import { FC, memo } from "react";
import { EditorState } from "@/components/editor/stores/EditorStore";
import "./index.scss";
import useGenSVGLines from "./hooks/useGenSVGLines";
import { map } from "lodash-es";
import classNames from "classnames";
import useGenSVGPoints from "./hooks/useGenSVGPoints";

interface FocusedHighlightProps {
  focusedInfo: NonNullable<EditorState["focusedInfo"]>;
}

const FocusedHighlightComp: FC<FocusedHighlightProps> = ({ focusedInfo }) => {
  const activeNodeDom = document.getElementById(String(focusedInfo.id));
  const domRect = activeNodeDom?.getBoundingClientRect();
  const lineRecords = useGenSVGLines(domRect);
  const pointRecords = useGenSVGPoints(domRect);

  if (!activeNodeDom) {
    return <></>;
  }

  const renderLines = () =>
    map(lineRecords, ({ position, ...res }) => (
      <line {...res} key={position} className={classNames("highlight-line", position)} />
    ));

  const renderPoints = () =>
    map(pointRecords, ({ position, ...res }) => (
      <circle
        {...res}
        key={position}
        className={classNames("highlight-point", position)}
      />
    ));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="focused-highlight"
    >
      {/* ------------- lines ------------- */}
      {renderLines()}
      {/* ------------- ponits ------------ */}
      {renderPoints()}
    </svg>
  );
};

export const FocusedHighlight = memo(FocusedHighlightComp);
