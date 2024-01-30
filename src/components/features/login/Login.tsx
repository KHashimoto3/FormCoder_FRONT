import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebase";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Login = () => {
  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const [userMail, setUserMail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [userMailError, setUserMailError] = useState<boolean>(false);
  const [userPasswordError, setUserPasswordError] = useState<boolean>(false);

  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const [inputMissed, setInputMissed] = useState<boolean>(false);

  const checkUserMail = () => {
    if (userMail === "") {
      setUserMailError(true);
    } else {
      setUserMailError(false);
    }
  };

  const checkUserPassword = () => {
    if (userPassword === "") {
      setUserPasswordError(true);
    } else {
      setUserPasswordError(false);
    }
  };

  const login = () => {
    //エラーがないことを確認
    if (userMail === "" || userPassword === "") {
      setInputMissed(true);
      return;
    }
    setInputMissed(false);

    signInWithEmailAndPassword(auth, userMail, userPassword)
      .then(() => {
        // Signed in
        alert("ログインしました。");
        location.href = "/";
      })
      .catch((error) => {
        setLoginFailed(true);
        console.log("ログインに失敗しました。：" + error.message);
      });
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
            id="user-mail"
            label="メールアドレス"
            variant="standard"
            required
            fullWidth
            value={userMail}
            error={userMailError}
            onBlur={() => checkUserMail()}
            onChange={(e) => setUserMail(e.target.value)}
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
