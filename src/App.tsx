import { BrowserRouter, Route } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { FormPage } from "./components/pages/FormPage";
import { TitleBar } from "./components/common/TitleBar";

function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <TopPage />
      </Route>
      <Route path="/learn">
        <p>学習ページがきます。</p>
      </Route>
      <Route path="/form">
        <FormPage />
      </Route>
      <Route path="/testTitle">
        <TitleBar />
      </Route>
    </BrowserRouter>
  );
}

export default App;
