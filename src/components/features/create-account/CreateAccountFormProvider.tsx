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

//password strength checker
import { zxcvbnOptions, zxcvbnAsync, ZxcvbnResult } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import * as zxcvbnDePackage from "@zxcvbn-ts/language-de";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";
import { useDeferredValue, useEffect, useState } from "react";
import { Check } from "@mui/icons-material";

// optional
const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher("pwned", matcherPwned);

const options = {
  // recommended
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
    // recommended the language of the country that the user will be in
    ...zxcvbnDePackage.dictionary,
  },
  // recommended
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  // recommended
  useLevenshteinDistance: true,
  // optional
  translations: zxcvbnEnPackage.translations,
};
zxcvbnOptions.setOptions(options);

const usePasswordStrength = (password: string) => {
  const [result, setResult] = useState<ZxcvbnResult | null>(null);
  // NOTE: useDeferredValue is React v18 only, for v17 or lower use debouncing
  const deferredPassword = useDeferredValue(password);

  useEffect(() => {
    zxcvbnAsync(deferredPassword).then((response) => setResult(response));
  }, [deferredPassword]);

  return result;
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

  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
  const [confirmEmailEmpty, setConfirmEmailEmpty] = useState<boolean>(false);
  const [nameEmpty, setNameEmpty] = useState<boolean>(false);
  const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] =
    useState<boolean>(false);

  const result = usePasswordStrength(password);

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
          <PasswordStrengResult password={password} result={result} />
          <CheckSamePassword
            password={password}
            confirmPassword={confirmPassword}
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

const PasswordStrengResult = (props: {
  password: string;
  result: ZxcvbnResult | null;
}) => {
  if (!props.result || props.password === "") {
    return null;
  }

  const { result } = props;
  const { score } = result;

  if (score < 2) {
    return <Typography color="error">弱いパスワード</Typography>;
  } else {
    return <Typography color="success">強いパスワード</Typography>;
  }
};

const CheckSamePassword = (props: {
  password: string;
  confirmPassword: string;
}) => {
  const { password, confirmPassword } = props;
  if (password === "" || confirmPassword === "") {
    return null;
  }
  if (password !== confirmPassword) {
    return <Typography color="error">パスワードが一致しません。</Typography>;
  }
  return null;
};
