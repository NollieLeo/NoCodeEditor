import { Editor } from "./components/editor";
import { ConfigProvider } from "zui-pro";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <ConfigProvider>
        <header className="app-header">fuck</header>
        <Editor />
      </ConfigProvider>
    </div>
  );
}

export default App;
