import { BrowserRouter, Route } from "react-router-dom";

import "./App.module.scss";
import { TopPage } from "./components/pages/TopPage";

function App() {
  return (
    <BrowserRouter>
      <h1 className="h1">動作しています！</h1>
      <Route path="/">
        <TopPage />
      </Route>
      <Route path="/learn">
        <p>学習ページがきます。</p>
      </Route>
    </BrowserRouter>
  );
}

export default App;
