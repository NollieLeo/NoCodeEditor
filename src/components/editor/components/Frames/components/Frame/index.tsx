import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, memo, useMemo } from "react";

export interface FrameProps {
  scopeId: string;
}

const FrameComp: FC<PropsWithChildren<FrameProps>> = observer(
  ({ children, scopeId }) => {
    const { scope } = useEditorContext();

    const title = useMemo(() => {
      const { width, height } = scope[scopeId];
      return `${scopeId} (${width} x ${height})`;
    }, [scope, scopeId]);

    return (
      <div className="editor-frame">
        <div className="editor-frame-header">{title}</div>
        {children}
      </div>
    );
  }
);

export const Frame = memo(FrameComp);
