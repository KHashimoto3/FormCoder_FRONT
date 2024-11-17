import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountValSchema } from "../../../utils/validation/createAccountValSchema";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(createAccountValSchema),
  });

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const handleCreateAccount = (data: FormData) => {
    alert("アカウントを作成します。");
    console.log(data);
    createAccount(data);
  };

  const createAccount = async (data: FormData) => {
    const url = `${apiBaseUrl}/user/register`;
    const obj = {
      userId: data.userId,
      name: data.name,
      password: data.password,
      icon: "none",
      email: data.email,
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
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Oops, we haven't got JSON!");
          }
          const statusCode = res.status;
          switch (statusCode) {
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        console.log(data);
        alert("アカウントを作成しました。ログイン画面でログインしてください。");
        location.href = "/login";
      });
    } catch (error) {
      alert("アカウントの作成に失敗しました。");
      console.error("Error:", error);
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
                {...register("email")}
                required
              />
              <Typography variant="body2" color="error">
                {errors.email?.message}
              </Typography>
              <Typography variant="body1">
                ログインに使用するため、有効なメールアドレスを入力してください。
              </Typography>

              <TextField
                label="ユーザーID"
                variant="standard"
                fullWidth
                margin="normal"
                {...register("userId")}
                required
              />
              <Typography variant="body2" color="error">
                {errors.userId?.message}
              </Typography>
              <Typography variant="body1">
                英数字で入力してください。他のユーザーには表示されません。
              </Typography>

              <TextField
                label="ユーザー名"
                variant="standard"
                fullWidth
                margin="normal"
                {...register("name")}
                required
              />
              <Typography variant="body2" color="error">
                {errors.name?.message}
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
                {...register("password")}
                required
              />
              <Typography variant="body2" color="error">
                {errors.password?.message}
              </Typography>
              <Typography variant="body1">
                条件: 8文字以上かつ、英数字を組み合わせたもの。
              </Typography>
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
