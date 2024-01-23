import { useEditorContext } from "@/components/editor/hooks/useEditorContext";
import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, memo, useMemo } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export interface FrameProps {
  scopeId: string;
}

const FrameComp: FC<PropsWithChildren<FrameProps>> = observer(
  ({ children, scopeId }) => {
    const {
      editorStore: { scope },
    } = useEditorContext();

    const title = useMemo(() => {
      const { width, height } = scope[scopeId];
      return `${scopeId} (${width} x ${height})`;
    }, [scope, scopeId]);

    return (
      <div className="editor-frame">
        <div className="editor-frame-header">
          <span>{title}</span>
          <Button type="text" icon={<PlusOutlined size={16} />}>
            Add Breakpoint
          </Button>
        </div>
        {children}
      </div>
    );
  }
);

export const Frame = memo(FrameComp);
