import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const CreateAccount = () => {
  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const handleCreateAccount = () => {
    alert("アカウントを作成しました");
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
        <Box sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
          <Box sx={{ height: "auto", marginTop: "20px", marginBottom: "20px" }}>
            <TextField
              label="メールアドレス"
              variant="standard"
              fullWidth
              margin="normal"
            />
            <Typography variant="body1">
              ログインに使用するため、有効なメールアドレスを入力してください。
            </Typography>
            <TextField
              label="ユーザー名"
              variant="standard"
              fullWidth
              margin="normal"
            />
            <Typography variant="body1">
              ニックネームでも構いません。他のユーザーに表示される名前です。
            </Typography>
            <TextField
              label="パスワード"
              variant="standard"
              type="password"
              fullWidth
              margin="normal"
            />
            <TextField
              label="パスワードの確認"
              variant="standard"
              type="password"
              fullWidth
              margin="normal"
            />
          </Box>
          <Stack spacing={2}>
            <Button
              data-testid="login-button"
              variant="contained"
              style={buttonStyle}
              onClick={handleCreateAccount}
            >
              作成
            </Button>
          </Stack>
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
        </Box>
      </Container>
    </div>
  );
};
