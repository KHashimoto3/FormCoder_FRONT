import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";

import { useCookies } from "react-cookie";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Login = () => {
  const apiBaseUrl = "https://form-coder-api.onrender.com";

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const [cookies, setCookie] = useCookies(["userId"]);

  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [userIdError, setUserIdError] = useState<boolean>(false);
  const [userPasswordError, setUserPasswordError] = useState<boolean>(false);

  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [inputMissed, setInputMissed] = useState<boolean>(false);

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
        console.log(data.userData.userId);
        setCookie("userId", data.userData.userId, {
          sameSite: "strict",
          path: "/",
        });
        location.href = "/";
      });
    } catch (error) {
      setLoginFailed(true);
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
        <Typography variant="h4" component="div" gutterBottom>
          ログイン
        </Typography>
        {loginFailed && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ marginBottom: "20px" }}
          >
            ログインに失敗しました。メールアドレスまたはパスワードに誤りがあります。
          </Alert>
        )}
        {inputMissed && (
          <Alert
            variant="filled"
            severity="warning"
            sx={{ marginBottom: "20px" }}
          >
            未入力の項目があります。
          </Alert>
        )}
        <Stack spacing={2}>
          <TextField
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
            variant="contained"
            sx={buttonStyle}
            fullWidth
            onClick={login}
          >
            {" "}
            ログイン{" "}
          </Button>
        </Stack>
        <Stack spacing={2} sx={{ marginTop: "20px" }}>
          <Typography variant="body2" color="text.secondary" align="center">
            アカウントをお持ちでない方
          </Typography>
          <Button variant="outlined" fullWidth>
            新規登録
          </Button>
        </Stack>
      </Container>
    </div>
  );
};
