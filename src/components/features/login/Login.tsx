import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useCookies } from "react-cookie";

export const Login = () => {
  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const [userMail, setUserMail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  const login = () => {
    signInWithEmailAndPassword(auth, userMail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("ログインしました。ユーザIDは、" + user.uid + "です。");
        setCookie("userId", user.uid);
        location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(
          "ログインに失敗しました。エラーコード：" +
            errorCode +
            "。エラーメッセージ：" +
            errorMessage
        );
      });
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4" component="div" gutterBottom>
          ログイン
        </Typography>
        <Stack spacing={2}>
          <TextField
            id="user-mail"
            label="メールアドレス"
            variant="standard"
            required
            fullWidth
            value={userMail}
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
