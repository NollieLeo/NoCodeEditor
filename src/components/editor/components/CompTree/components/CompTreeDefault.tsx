import { Fragment, memo, useMemo } from "react";
import { CompTreeProps } from "../types";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useGetComponentInfo } from "@/components/editor/hooks/useGetComponentInfo";
import { isNil, map } from "lodash-es";
import { observer } from "mobx-react-lite";

const CompTreeDefaultComp = observer((props: Pick<CompTreeProps, "rootId">) => {
  const { rootId } = props;
  if (isNil(rootId)) {
    throw new Error(`root id;${rootId} does not exist`);
  }

  const { getComponentInfo } = useGetComponentInfo();

  const componentInfo = getComponentInfo(rootId);

  const { type, childsId, attrs } = componentInfo;

  const { render: Component } = COMPONENTS_INFO[type];

  const childComps = useMemo(
    () =>
      childsId?.length
        ? map(childsId, (childId) => (
            <Fragment key={childId}>
              <CompTreeDefault rootId={childId} />
            </Fragment>
          ))
        : attrs.children,
    [childsId, attrs.children]
  );

  return (
    <Component {...attrs} style={{ ...attrs.style }} children={childComps} />
  );
});

export const CompTreeDefault = memo(CompTreeDefaultComp);
