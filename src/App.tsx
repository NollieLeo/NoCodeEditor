import { Editor } from "./components/editor";
import { ConfigProvider } from "antd";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <ConfigProvider>
        <header className="app-header">我他妈是个头</header>
        <Editor />
      </ConfigProvider>
    </div>
  );
}

export default App;
