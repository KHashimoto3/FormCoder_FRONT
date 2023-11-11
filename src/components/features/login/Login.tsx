import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Login = () => {
  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4" component="div" gutterBottom>
          ログイン
        </Typography>
        <Stack spacing={2}>
          <TextField
            id="user-id"
            label="ユーザID"
            variant="standard"
            required
            fullWidth
            value={userId}
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
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Button variant="contained" sx={buttonStyle} fullWidth>
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
