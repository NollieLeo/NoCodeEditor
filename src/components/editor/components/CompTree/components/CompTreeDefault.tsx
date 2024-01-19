import { Fragment, memo, useMemo } from "react";
import { CompTreeProps } from "../types";
import { COMPONENTS_INFO } from "@/components/editor/constants";
import { useGetNodeInfo } from "@/components/editor/hooks/useGetNodeInfo";
import { isNil, map } from "lodash-es";
import { observer } from "mobx-react-lite";

const CompTreeDefaultComp = observer((props: Pick<CompTreeProps, "rootId">) => {
  const { rootId } = props;
  if (isNil(rootId)) {
    throw new Error(`root id;${rootId} does not exist`);
  }

  const { getNodeInfo } = useGetNodeInfo();

  const schemaData = getNodeInfo(rootId);

  const { type, childNodes, data } = schemaData;

  const { render: Component } = COMPONENTS_INFO[type];

  const childComps = useMemo(
    () =>
      childNodes?.length
        ? map(childNodes, (childId) => (
            <Fragment key={childId}>
              <CompTreeDefault rootId={childId} />
            </Fragment>
          ))
        : data.children,
    [childNodes, data.children]
  );

  return (
    <Component {...data} style={{ ...data.style }} children={childComps} />
  );
});

export const CompTreeDefault = memo(CompTreeDefaultComp);
