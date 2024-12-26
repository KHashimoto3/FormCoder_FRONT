import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { Hint } from "./hint/Hint";
import { Form } from "./form/Form";
import { useContext, useEffect, useState } from "react";
import { HintContext } from "./hint/HintProvider";
import { InputContext } from "./form/InputArrayProvider";
import { CodeContext } from "./exec/CodeProvider";
import { SequenceContext } from "./sequence/SequenceDataProvider";

import { RotatingLines } from "react-loader-spinner";
import { CodeExec } from "./exec/CodeExec";

import { useUserData } from "../common/hooks/useUserData";

export const FormBase = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [formName, setFormName] = useState<string>("フォーム名"); //TODO: 後日、削除する
  const [formId, setFormId] = useState<string>("");

  //保存済みのrecordId
  const [recordId, setRecordId] = useState<string>("");

  const { hintFBArray } = useContext(HintContext);
  const { inputArray } = useContext(InputContext);
  const { code } = useContext(CodeContext);
  const { sequenceDataArray } = useContext(SequenceContext);

  //ローディングモーダル
  const [loading, setLoading] = useState<boolean>(true);

  //ログイン状態
  const { getUserData } = useUserData();

  const [userId, setUserId] = useState<string>("");

  //実行画面表示の切り替え
  const [execView, setExecView] = useState<boolean>(false);

  //保存モーダルの開閉
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  //分析結果画面へ遷移
  const jumpToAnalytics = () => {
    console.log("recordId: " + recordId);
    location.href = "/analytics?id=" + recordId;
  };

  //ローディングモーダルを閉じる
  const handleLoadingClose = () => {
    setLoading(false);
  };

  const reopenQuestionWindow = () => {
    const questionWindowPath = "/question?formId=" + formId;
    window.open(questionWindowPath, "question", "width=500,height=800");
  };

  useEffect(() => {
    //リクエストパラメータのフォーム名を取得し、フォームを取得する
    const url = new URL(window.location.href);
    const formName = url.searchParams.get("form");
    const formId = url.searchParams.get("formId");
    if (formName == null) {
      setFormName("フォーム名");
    } else {
      setFormName(formName);
    }

    if (formId == null) {
      setFormId("000000");
    } else {
      setFormId(formId);
    }

    //問題を表示するためにQuestionPageを別windowで開く
    const questionWindowPath = "/question?formId=" + formId;
    window.open(questionWindowPath, "question", "width=500,height=800");

    //ログイン状態を確認する
    const userData = getUserData();
    if (userData.userId === undefined) {
      alert("ログインしていないため、学習できません。");
      location.href = "/login";
    }
    setUserId(userData.userId);
  }, []);

  const saveLearningData = async () => {
    const url = `${apiBaseUrl}/record`;
    //仮のシーケンスデータを追加
    //initSequenceData();

    const sampleSeqAnalyze = {
      speed: 50,
    };
    //TODO: userNameとformNameを渡せるようにAPIを変更する
    const obj = {
      userId: userId,
      formId: formId,
      fbData: hintFBArray,
      inputData: inputArray,
      connectedCode: code,
      sequence: sequenceDataArray,
      seqAnalyze: sampleSeqAnalyze,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then(async (res) => {
        if (!res.ok) {
          const statusCode = res.status;
          switch (statusCode) {
            case 400:
              throw new Error("Bad Request");
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        const recordId = data.recordId;
        setRecordId(recordId);
        handleClickOpen();
      });
    } catch (error) {
      alert("A: アップロード中にエラーが発生しました。");
      console.log(error);
    }
  };

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          background: "#fff",
          borderRadius: "10px",
          position: "fixed",
          marginTop: "-70px",
          zIndex: "1000",
        }}
      >
        <Dialog
          open={loading}
          onClose={handleLoadingClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ zIndex: "10000" }}
        >
          <DialogTitle id="alert-dialog-title">
            {"学習データを読み込んでいます・・・"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: "center" }}>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </Box>
          </DialogContent>
        </Dialog>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#000",
                textDecoration: "none",
              }}
            >
              FormCoder
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Typography variant="h5" sx={{ color: "#000" }}>
                {formName}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0.03, display: { xs: "none", md: "flex" } }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={execView}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setExecView(event.target.checked)
                    }
                  />
                }
                sx={{ color: "#000" }}
                label="実行画面を表示"
              />
            </Box>
            <Box
              sx={{
                flexGrow: 0.03,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Stack spacing={1} direction="row">
                <Button
                  onClick={reopenQuestionWindow}
                  color="primary"
                  variant="outlined"
                >
                  問題文を再表示
                </Button>
                <Button onClick={saveLearningData} style={buttonStyle}>
                  保存する
                </Button>
              </Stack>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <PersonIcon fontSize="large" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"保存完了"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            保存が完了しました！終了して分析結果を表示しますか？または、編集を続けますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            編集を続ける
          </Button>
          <Button variant="contained" onClick={jumpToAnalytics} autoFocus>
            分析結果表示
          </Button>
        </DialogActions>
      </Dialog>
      {execView ? <CodeExec /> : null}
      <Box sx={{ marginTop: "100px" }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Hint />
          </Grid>
          <Grid item xs={7}>
            <Form setLoading={setLoading} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
