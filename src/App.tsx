import { BrowserRouter, Route } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { FormPage } from "./components/pages/FormPage";
import { TitleBar } from "./components/common/TitleBar";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <TitleBar />
        <TopPage />
      </Route>
      <Route path="/learn">
        <TitleBar />
        <p>学習ページがきます。</p>
      </Route>
      <Route path="/form">
        <TitleBar />
        <FormPage />
      </Route>
      <Route path="/testTitle">
        <TitleBar />
      </Route>
    </BrowserRouter>
  );
}

export default App;
