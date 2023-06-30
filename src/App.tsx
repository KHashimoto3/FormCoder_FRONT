import { BrowserRouter, Route } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { FormPage } from "./components/pages/FormPage";
import { TitleBar } from "./components/common/TitleBar";
import { HintProvider } from "./components/features/hint/HintProvider";

function App() {
  return (
    <HintProvider>
      <BrowserRouter>
        <Route exact path="/">
          <TitleBar barType="nomal" formName="" />
          <TopPage />
        </Route>
        <Route path="/learn">
          <TitleBar barType="nomal" formName="" />
          <p>学習ページがきます。</p>
        </Route>
        <Route path="/form">
          <TitleBar barType="form" formName="サンプルフォーム" />
          <FormPage />
        </Route>
        <Route path="/testTitle">
          <TitleBar barType="nomal" formName="" />
        </Route>
      </BrowserRouter>
    </HintProvider>
  );
}

export default App;
