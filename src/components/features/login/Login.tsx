import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useUserData } from "../../common/hooks/useUserData";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { User } from "../../types/user";

export const Login = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

  const { setUserData } = useUserData();

  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [userIdError, setUserIdError] = useState<boolean>(false);
  const [userPasswordError, setUserPasswordError] = useState<boolean>(false);

  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [inputMissed, setInputMissed] = useState<boolean>(false);

  const [loginProgress, setLoginProgress] = useState<boolean>(false);

  const checkUserId = () => {
    if (userId === "") {
      setUserIdError(true);
    } else {
      setUserIdError(false);
    }
  };

  const checkUserPassword = () => {
    if (userPassword === "") {
      setUserPasswordError(true);
    } else {
      setUserPasswordError(false);
    }
  };

  const login = async () => {
    if (userId === "") {
      setUserIdError(true);
    }
    if (userPassword === "") {
      setUserPasswordError(true);
    }

    if (userId === "" || userPassword === "") {
      setInputMissed(true);
      setLoginProgress(false);
      return;
    }
    setInputMissed(false);

    const url = `${apiBaseUrl}/user/login`;
    const obj = {
      userId: userId,
      password: userPassword,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const statusCode = res.status;
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Oops, we haven't got JSON!");
          }
          switch (statusCode) {
            case 400:
              throw new Error("Bad Request");
            case 401:
              throw new Error("Unauthorized");
            case 404:
              throw new Error("Not Found");
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        const userData: User = data.userData;
        setUserData(userData);
        setLoginProgress(false);
        location.href = "/dashboard/" + userData.userId;
      });
    } catch (error) {
      setLoginFailed(true);
      setLoginProgress(false);
    }
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
        <Typography
          data-testid="login-page-title"
          variant="h4"
          component="div"
          gutterBottom
        >
          ログイン
        </Typography>
        {loginFailed && (
          <Alert
            data-testid="login-failed-alert"
            variant="filled"
            severity="error"
            sx={{ marginBottom: "20px" }}
          >
            ログインに失敗しました。ユーザIDまたはパスワードに誤りがあります。
          </Alert>
        )}
        {inputMissed && (
          <Alert
            data-testid="input-missed-alert"
            variant="filled"
            severity="warning"
            sx={{ marginBottom: "20px" }}
          >
            未入力の項目があります。
          </Alert>
        )}
        <Stack spacing={2}>
          <TextField
            data-testid="user-id-field"
            id="user-id"
            label="ユーザID"
            variant="standard"
            required
            fullWidth
            value={userId}
            error={userIdError}
            onBlur={() => checkUserId()}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            data-testid="user-password-field"
            id="user-password"
            label="パスワード"
            type="password"
            variant="standard"
            required
            fullWidth
            value={userPassword}
            error={userPasswordError}
            onBlur={() => checkUserPassword()}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Button
            data-testid="login-button"
            variant="contained"
            fullWidth
            onClick={() => {
              setLoginProgress(true);
              login();
            }}
            disabled={loginProgress}
          >
            {" "}
            ログイン{" "}
          </Button>
        </Stack>
        <Stack spacing={2} sx={{ marginTop: "20px" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            アカウントをお持ちでない方
          </Typography>
          <Button
            variant="outlined"
            onClick={() => (location.href = "/create-account")}
            fullWidth
          >
            新規登録
          </Button>
        </Stack>
      </Container>
    </div>
  );
};
