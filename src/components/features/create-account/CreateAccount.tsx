import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { error } from "console";

interface FormData {
  email: string;
  userId: string;
  name: string;
  password: string;
}

export const CreateAccount = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const handleCreateAccount = (data: FormData) => {
    alert("アカウントを作成します。");
    console.log(data);
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
          <form onSubmit={handleSubmit(handleCreateAccount)}>
            <Box
              sx={{ height: "auto", marginTop: "20px", marginBottom: "20px" }}
            >
              <TextField
                label="メールアドレス"
                variant="standard"
                type="email"
                fullWidth
                margin="normal"
                {...register("email", {
                  required: "メールアドレスは必須です",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "メールアドレスの形式が正しくありません",
                  },
                })}
                required
              />
              <Typography variant="body2" color="error">
                {errors.email?.type === "required" && errors.email.message}
              </Typography>
              <Typography variant="body2" color="error">
                {errors.email?.type === "pattern" && errors.email.message}
              </Typography>
              <Typography variant="body1">
                ログインに使用するため、有効なメールアドレスを入力してください。
              </Typography>

              <TextField
                label="ユーザーID"
                variant="standard"
                fullWidth
                margin="normal"
                {...register("userId", { required: "ユーザーIDは必須です。" })}
                required
              />
              <Typography variant="body2" color="error">
                {errors.userId?.type === "required" && errors.userId.message}
              </Typography>
              <Typography variant="body1">
                英数字で入力してください。他のユーザーには表示されません。
              </Typography>

              <TextField
                label="ユーザー名"
                variant="standard"
                fullWidth
                margin="normal"
                {...register("name", { required: "ユーザー名は必須です。" })}
                required
              />
              <Typography variant="body2" color="error">
                {errors.name?.type === "required" && errors.name.message}
              </Typography>
              <Typography variant="body1">
                ニックネームでも構いません。他のユーザーに表示される名前です。
              </Typography>

              <TextField
                label="パスワード"
                variant="standard"
                type="password"
                fullWidth
                margin="normal"
                {...register("password", {
                  required: "パスワードは必須です",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上で入力してください",
                  },
                })}
                required
              />
              <Typography variant="body2" color="error">
                {errors.password?.type === "required" &&
                  errors.password.message}
              </Typography>
              <Typography variant="body2" color="error">
                {errors.password?.type === "minLength" &&
                  errors.password.message}
              </Typography>
              <Typography variant="body1">条件: 8文字以上</Typography>
            </Box>
            <Stack spacing={2}>
              <Button
                data-testid="login-button"
                variant="contained"
                style={buttonStyle}
                type="submit"
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
          </form>
        </Box>
      </Container>
    </div>
  );
};
