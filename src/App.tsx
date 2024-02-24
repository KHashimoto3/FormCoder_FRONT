import { BrowserRouter, Route } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { FormPage } from "./components/pages/FormPage";
import { TitleBar } from "./components/common/TitleBar";
import { HintProvider } from "./components/features/hint/HintProvider";
import { InputArrayProvider } from "./components/features/form/InputArrayProvider";
import { StorageTestPage } from "./components/pages/StorageTestPage";
import { LearningPage } from "./components/pages/LearningPage";
import { ReasonCheckPage } from "./components/pages/ReasonCheckPage";
import { LoginPage } from "./components/pages/LoginPage";
import { QuestionPage } from "./components/pages/QuestionPage";
import { FormDataProvider } from "./components/features/form/FormDataProvider";
import { AuthProvider } from "./components/features/login/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <HintProvider>
        <InputArrayProvider>
          <FormDataProvider>
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
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/question">
                <QuestionPage />
              </Route>
            </BrowserRouter>
          </FormDataProvider>
        </InputArrayProvider>
      </HintProvider>
    </AuthProvider>
  );
}

export default App;
