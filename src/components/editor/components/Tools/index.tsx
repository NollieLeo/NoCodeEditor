import { observer } from "mobx-react-lite";
import { useBoardContext } from "../../hooks/useBoardContext";
import "./index.scss";

export const Tools = observer(() => {
  const { boardStore } = useBoardContext();

  console.log("boardStore?.overNode", boardStore?.overNode);

  const renderBorder = () => {
    if (boardStore?.overNode) {
      return (
        <div
          style={{
            ...boardStore?.overNode.rect,
            position: "absolute",
            border: "1px solid red",
          }}
        >
          {JSON.stringify(boardStore?.overNode.rect)}
        </div>
      );
    }
  };

  return <div className="tools-wrapper">{renderBorder()}</div>;
});
