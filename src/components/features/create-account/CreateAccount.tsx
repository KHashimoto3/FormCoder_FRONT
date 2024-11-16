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

//password strength checker
import { zxcvbnOptions, zxcvbnAsync, ZxcvbnResult } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import * as zxcvbnDePackage from "@zxcvbn-ts/language-de";
import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";
import { useDeferredValue, useEffect, useState } from "react";

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

export const CreateAccount = () => {
  //各情報を保持する
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const result = usePasswordStrength(password);

  //入力欄の空チェック
  const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
  const [nameEmpty, setNameEmpty] = useState<boolean>(false);
  const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] =
    useState<boolean>(false);

  //パスワードの長さチェック
  const [passwordLengthError, setPasswordLengthError] =
    useState<boolean>(false);

  //パスワードの不一致チェック
  const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false);

  //最初は空の入力があるため、アラートを表示
  const [inputMissed, setInputMissed] = useState<boolean>(false);

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  //バリデーション
  const PasswordStrengResult = (props: {
    password: string;
    result: ZxcvbnResult | null;
  }) => {
    if (!props.result || props.password === "") {
      return null;
    }

    const { result } = props;
    const { score } = result;

    return (
      <Typography color={score < 2 ? "error" : "#4E9316"}>
        {score < 2 ? "弱いパスワード" : "強いパスワード"}
      </Typography>
    );
  };

  const isLengthShort = (value: string, len: number) => {
    return value.length < len ? true : false;
  };

  const isEmpty = (value: string) => {
    return value === "" ? true : false;
  };

  //リアルタイムなエラーチェック
  const checkEmail = () => {
    setEmailEmpty(isEmpty(email));
  };

  const checkUserName = () => {
    setNameEmpty(isEmpty(userName));
  };

  const checkPassword = () => {
    setPasswordEmpty(isEmpty(password));
    setPasswordLengthError(isLengthShort(password, 8));
  };

  const checkConfirmPassword = () => {
    setConfirmPasswordEmpty(isEmpty(confirmPassword));
    setPasswordMatchError(password !== confirmPassword);
  };

  //アカウント作成
  const handleCreateAccount = () => {
    checkEmail();
    checkUserName();
    checkPassword();
    checkConfirmPassword();

    if (
      emailEmpty ||
      nameEmpty ||
      passwordEmpty ||
      confirmPasswordEmpty ||
      passwordLengthError ||
      passwordMatchError
    ) {
      setInputMissed(true);
      return;
    }
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
        <Box sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
          <Box sx={{ height: "auto", marginTop: "20px", marginBottom: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="h6">1. メールアドレスの入力</Typography>
              <TextField
                label="メールアドレス"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={checkEmail}
                fullWidth
                margin="normal"
                error={emailEmpty}
              />
              {emailEmpty && (
                <Typography color="error">入力してください。</Typography>
              )}
              <Typography variant="body1">
                ログインに使用するため、有効なメールアドレスを入力してください。
              </Typography>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="h6">2. ユーザー名の入力</Typography>
              <TextField
                label="ユーザー名"
                variant="standard"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={checkUserName}
                fullWidth
                margin="normal"
                error={nameEmpty}
              />
              {nameEmpty && (
                <Typography color="error">入力してください。</Typography>
              )}
              <Typography variant="body1">
                ニックネームでも構いません。他のユーザーに表示される名前です。
              </Typography>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Typography variant="h6">3. パスワードの入力</Typography>
              <TextField
                label="パスワード"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={checkPassword}
                fullWidth
                margin="normal"
                error={passwordEmpty || passwordLengthError}
              />
              <PasswordStrengResult password={password} result={result} />
              {passwordEmpty && (
                <Typography color="error">入力してください。</Typography>
              )}
              {passwordLengthError && (
                <Typography color="error">
                  8文字以上のパスワードを入力してください。
                </Typography>
              )}
              <TextField
                label="パスワードの確認"
                variant="standard"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={checkConfirmPassword}
                fullWidth
                margin="normal"
                error={confirmPasswordEmpty}
              />
              {confirmPasswordEmpty && (
                <Typography color="error">入力してください。</Typography>
              )}

              {passwordMatchError && (
                <Typography color="error">
                  パスワードが一致しません。
                </Typography>
              )}
            </div>
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
