import { TextField, Typography } from "@mui/material";

type Props = {
  stepNumber: number;
  email: string;
  confirmEmail: string;
  userName: string;
  password: string;
  confirmPassword: string;
  setEmail: (email: string) => void;
  setConfirmEmail: (confirmEmail: string) => void;
  setUserName: (userName: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
};

export const CreateAccountFormProvider = (props: Props) => {
  const {
    stepNumber,
    email,
    confirmEmail,
    userName,
    password,
    confirmPassword,
    setEmail,
    setConfirmEmail,
    setUserName,
    setPassword,
    setConfirmPassword,
  } = props;

  switch (stepNumber) {
    case 1:
      return (
        <div>
          <Typography variant="h5">メールアドレスの入力</Typography>
          <TextField
            label="メールアドレス"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="メールアドレスの確認"
            variant="standard"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="body1">
            ログインに使用するため、有効なメールアドレスを入力してください。
          </Typography>
        </div>
      );
    case 2:
      return (
        <div>
          <Typography variant="h5">ユーザー名の入力</Typography>
          <TextField
            label="ユーザー名"
            variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="body1">
            ニックネームでも構いません。他のユーザーに表示される名前です。
          </Typography>
        </div>
      );
    case 3:
      return (
        <div>
          <Typography variant="h5">パスワードの入力</Typography>
          <TextField
            label="パスワード"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="パスワードの確認"
            variant="standard"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="body1">
            8文字以上かつ英数字を組み合わせたパスワードを入力してください。
          </Typography>
        </div>
      );
    case 4:
      return (
        <div>
          <Typography variant="h5">入力内容確認</Typography>
          <Typography variant="body1">メールアドレス: {email}</Typography>
          <Typography variant="body1">ユーザー名: {userName}</Typography>
          <Typography variant="body1">パスワード: {password}</Typography>
        </div>
      );
    default:
      return (
        <div>
          <Typography variant="h5">アカウントの作成</Typography>
        </div>
      );
  }
};
