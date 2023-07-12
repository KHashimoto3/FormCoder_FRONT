import { BrowserRouter, Route } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { FormPage } from "./components/pages/FormPage";
import { TitleBar } from "./components/common/TitleBar";
import { HintProvider } from "./components/features/hint/HintProvider";
import { InputArrayProvider } from "./components/features/form/InputArrayProvider";

function App() {
  return (
    <HintProvider>
      <InputArrayProvider>
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
            <FormPage />
          </Route>
        </BrowserRouter>
      </InputArrayProvider>
    </HintProvider>
  );
}

export default App;
