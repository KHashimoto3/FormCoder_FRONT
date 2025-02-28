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
import { DashboardPage } from "./components/pages/DashboardPage";

import { CookiesProvider } from "react-cookie";
import { CodeProvider } from "./components/features/exec/CodeProvider";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { SequenceDataProvider } from "./components/features/sequence/SequenceDataProvider";
import { CreateAccountPage } from "./components/pages/CreateAccountPage";
import { TimestampProvider } from "./components/features/sequence/TimestampProvider";
import React from "react";
import { MaintenancePage } from "./components/pages/MaintenacePage";

function App() {
  //メンテナンス中の場合はtrueにする
  const [maintenance] = React.useState(true);
  if (maintenance) {
    return <MaintenancePage />;
  } else {
    return (
      <CookiesProvider>
        <CodeProvider>
          <HintProvider>
            <InputArrayProvider>
              <FormDataProvider>
                <SequenceDataProvider>
                  <TimestampProvider>
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
                      <Route path="/create-account">
                        <CreateAccountPage />
                      </Route>
                      <Route path="/question">
                        <QuestionPage />
                      </Route>
                      <Route path="/dashboard">
                        <DashboardPage />
                      </Route>
                      <Route path="/analytics">
                        <AnalyticsPage />
                      </Route>
                    </BrowserRouter>
                  </TimestampProvider>
                </SequenceDataProvider>
              </FormDataProvider>
            </InputArrayProvider>
          </HintProvider>
        </CodeProvider>
      </CookiesProvider>
    );
  }
}

export default App;
