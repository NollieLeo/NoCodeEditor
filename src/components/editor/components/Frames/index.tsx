import { observer } from "mobx-react-lite";
import { useEditorContext } from "../../hooks/useEditorContext";
import { find, forEach, map } from "lodash-es";
import { ComponentInfo, ComponentTypes } from "../../types";
import { Frame } from "./components/Frame";
import { CompTree } from "../CompTree";
import { FC, memo, useCallback } from "react";
import "./index.scss";

const FramesComp: FC = observer(() => {
  const {
    editorStore: { componentsInfo },
  } = useEditorContext();

  const componentsInfoByScope = useCallback(() => {
    const tempSomponentsInfoByScope: Record<
      string,
      Record<string, ComponentInfo>
    > = {};
    forEach(componentsInfo, (componentInfo) => {
      const { scopeId, id } = componentInfo;
      if (!tempSomponentsInfoByScope[scopeId]) {
        tempSomponentsInfoByScope[scopeId] = {};
      }
      tempSomponentsInfoByScope[scopeId][id] = componentInfo;
    });
    return tempSomponentsInfoByScope;
  }, [componentsInfo]);

  const renderFrames = () =>
    map(componentsInfoByScope(), (scopeComponentsInfo, scopeId) => {
      const root = find(
        scopeComponentsInfo,
        ({ type }) => type === ComponentTypes.PAGE
      );
      if (!root) {
        return null;
      }
      return (
        <Frame key={scopeId} scopeId={scopeId}>
          <CompTree rootId={root.id} />
        </Frame>
      );
    });

  return <div className="editor-frames">{renderFrames()}</div>;
});

export const Frames = memo(FramesComp);
