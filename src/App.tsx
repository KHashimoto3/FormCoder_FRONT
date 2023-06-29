import { BrowserRouter, Route } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { FormPage } from "./components/pages/FormPage";
import { TitleBar } from "./components/common/TitleBar";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <TitleBar barType="nomal" />
        <TopPage />
      </Route>
      <Route path="/learn">
        <TitleBar barType="nomal" />
        <p>学習ページがきます。</p>
      </Route>
      <Route path="/form">
        <TitleBar barType="form" />
        <FormPage />
      </Route>
      <Route path="/testTitle">
        <TitleBar barType="nomal" />
      </Route>
    </BrowserRouter>
  );
}

export default App;
