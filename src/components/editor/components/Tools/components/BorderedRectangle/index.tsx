import {
  CSSProperties,
  FC,
  SVGAttributes,
  SVGProps,
  memo,
  useMemo,
} from "react";

import "./index.scss";

// 0 ➡️ x
// ⬇️
// y

interface BorderDrawingCompProps extends SVGProps<SVGSVGElement> {
  style: CSSProperties;
  borderAttrs?: SVGAttributes<SVGLineElement>;
  anchorPoint?: boolean;
}

const DEFAULT_LINE_ATTRS: SVGAttributes<SVGLineElement> = {
  strokeWidth: 2,
  strokeLinecap: "square",
  stroke: "#1450d9",
};

const DEFAULT_POINT_ATTRS: SVGAttributes<SVGCircleElement> = {
  stroke: "#1450d9",
  fill: "#fff",
  strokeWidth: 2,
  r: 2,
  className: "bordered-drawing-ponit",
};

const BorderedRectangleDrawingComp: FC<BorderDrawingCompProps> = (props) => {
  const { style, borderAttrs = {}, anchorPoint, ...res } = props;

  const { width, height } = style;

  const lineAttrs: SVGAttributes<SVGLineElement> = useMemo(
    () => ({
      ...DEFAULT_LINE_ATTRS,
      ...borderAttrs,
    }),
    [borderAttrs]
  );

  const renderLines = () => {
    const topLine = <line {...lineAttrs} x1={0} x2={width} y1={0} y2={0} />;
    const rightLine = (
      <line {...lineAttrs} x1={width} x2={width} y1={0} y2={height} />
    );
    const bottomLine = (
      <line {...lineAttrs} x1={0} x2={width} y1={height} y2={height} />
    );
    const leftLine = <line {...lineAttrs} x1={0} x2={0} y1={0} y2={height} />;
    return (
      <>
        {topLine}
        {rightLine}
        {bottomLine}
        {leftLine}
      </>
    );
  };

  const renderAnchorPoints = () => {
    if (!anchorPoint) {
      return <></>;
    }
    return (
      <>
        <circle {...DEFAULT_POINT_ATTRS} cx={0} cy={0} />,
        <circle {...DEFAULT_POINT_ATTRS} cx={width} cy={0} />,
        <circle {...DEFAULT_POINT_ATTRS} cx={width} cy={height} />,
        <circle {...DEFAULT_POINT_ATTRS} cx={0} cy={height} />,
      </>
    );
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      {...res}
      style={style}
      className="border-drawing"
    >
      {renderLines()}
      {renderAnchorPoints()}
    </svg>
  );
};

export const BorderedRectangle = memo(BorderedRectangleDrawingComp);
