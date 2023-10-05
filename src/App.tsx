import { BrowserRouter, Route } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { FormPage } from "./components/pages/FormPage";
import { TitleBar } from "./components/common/TitleBar";
import { HintProvider } from "./components/features/hint/HintProvider";
import { InputArrayProvider } from "./components/features/form/InputArrayProvider";
import { StorageTestPage } from "./components/pages/StorageTestPage";
import { LearningPage } from "./components/pages/LearningPage";
import { ReasonCheckPage } from "./components/pages/ReasonCheckPage";

function App() {
  return (
    <HintProvider>
      <InputArrayProvider>
        <BrowserRouter>
          <Route exact path="/">
            <TitleBar />
            <TopPage />
          </Route>
          <Route path="/learning">
            <TitleBar />
            <LearningPage />
          </Route>
          <Route path="/form">
            <FormPage />
          </Route>
          <Route path="/storagetest">
            <StorageTestPage />
          </Route>
          <Route path="/reason-check">
            <ReasonCheckPage />
          </Route>
        </BrowserRouter>
      </InputArrayProvider>
    </HintProvider>
  );
}

export default App;
