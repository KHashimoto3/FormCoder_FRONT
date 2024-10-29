import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { CreateAccountFormProvider } from "./CreateAccountFormProvider";

export const CreateAccount = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  //各情報を保持する
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const steps = [
    "メールアドレスの入力",
    "ユーザー名の入力",
    "パスワードの入力",
    "入力内容確認",
  ];

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          variant="h6"
          component="div"
          onClick={() => {
            location.href = "/";
          }}
          sx={{ cursor: "pointer" }}
          gutterBottom
        >
          <ArrowBackIcon sx={{ marginRight: "10px" }} />
          ホームに戻る
        </Typography>
        <Typography variant="h4">アカウントの作成</Typography>
        <Box sx={{ width: "100%", marginTop: "20px" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{ height: "250px", marginTop: "20px", marginBottom: "20px" }}
          >
            <CreateAccountFormProvider
              stepNumber={activeStep + 1}
              email={email}
              confirmEmail={confirmEmail}
              userName={userName}
              password={password}
              confirmPassword={confirmPassword}
              setEmail={setEmail}
              setConfirmEmail={setConfirmEmail}
              setUserName={setUserName}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
            />
          </Box>
          <Stack spacing={2}>
            {activeStep === steps.length - 1 && (
              <Button
                data-testid="login-button"
                variant="contained"
                style={buttonStyle}
                onClick={() => alert("アカウントを作成しました")}
              >
                作成
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <Button
                data-testid="login-button"
                variant="contained"
                color="primary"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                次へ
              </Button>
            )}
            {activeStep > 0 && activeStep < steps.length && (
              <Button
                data-testid="login-button"
                variant="outlined"
                color="primary"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                戻る
              </Button>
            )}
          </Stack>
          {activeStep === 0 && (
            <Stack spacing={2} sx={{ marginTop: "20px" }}>
              <Typography variant="body2" color="text.secondary" align="center">
                すでにアカウントをお持ちの方
              </Typography>
              <Button
                variant="outlined"
                onClick={() => (location.href = "/login")}
                fullWidth
              >
                ログイン
              </Button>
            </Stack>
          )}
        </Box>
      </Container>
    </div>
  );
};
