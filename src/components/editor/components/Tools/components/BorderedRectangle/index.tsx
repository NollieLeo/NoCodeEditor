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
  style: {
    width: number;
    height: number;
  } & CSSProperties;
  borderAttrs?: SVGAttributes<SVGLineElement>;
}

const DEFAULT_LINE_ATTRS: SVGAttributes<SVGLineElement> = {
  strokeWidth: 2,
  strokeLinecap: "square",
  stroke: "blue",
};

const BorderedRectangleDrawingComp: FC<BorderDrawingCompProps> = (props) => {
  const { style, borderAttrs = {}, ...res } = props;

  const { width, height } = style;

  const lineAttrs: SVGAttributes<SVGLineElement> = useMemo(
    () => ({
      ...DEFAULT_LINE_ATTRS,
      ...borderAttrs,
    }),
    [borderAttrs]
  );

  const topLine = <line {...lineAttrs} x1={0} x2={width} y1={0} y2={0} />;
  const rightLine = (
    <line {...lineAttrs} x1={width} x2={width} y1={0} y2={height} />
  );
  const bottomLine = (
    <line {...lineAttrs} x1={0} x2={width} y1={height} y2={height} />
  );
  const leftLine = <line {...lineAttrs} x1={0} x2={0} y1={0} y2={height} />;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      {...res}
      style={style}
      className="border-drawing"
    >
      {topLine}
      {rightLine}
      {bottomLine}
      {leftLine}
    </svg>
  );
};

export const BorderedRectangle = memo(BorderedRectangleDrawingComp);
