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
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Hint } from "./hint/Hint";
import { Form } from "./form/Form";
import { useContext, useEffect, useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { HintContext } from "./hint/HintProvider";
import { InputContext } from "./form/InputArrayProvider";

import { RotatingLines } from "react-loader-spinner";

// Create a storage reference from our storage service

export const FormBase = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [formName, setFormName] = useState<string>("フォーム名");

  const { hintFBArray } = useContext(HintContext);
  const { inputArray } = useContext(InputContext);

  //保存モーダル
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [helper, setHelper] = useState<string>("");

  //ローディングモーダル
  const [loading, setLoading] = useState<boolean>(true);

  //保存モーダルの開閉
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  //ローディングモーダルを閉じる
  const handleLoadingClose = () => {
    setLoading(false);
  };

  useEffect(() => {
    //リクエストパラメータのフォーム名を取得し、フォームを取得する
    const url = new URL(window.location.href);
    const formName = url.searchParams.get("form");
    if (formName == null) {
      setFormName("フォーム名");
    } else {
      setFormName(formName);
    }
  }, []);

  const saveLearningData = (userName: string) => {
    //入力がない場合はエラーを出す
    if (userName == "") {
      setError(true);
      setHelper("名前の入力は必須です。");
      return;
    }
    setError(false);
    setHelper("");
    //リクエストパラメータのフォーム名を取得し、フォームを取得する
    const url = new URL(window.location.href);
    const formName = url.searchParams.get("form");
    const storageRef = ref(
      storage,
      "record/" + userName + "_" + formName + ".json",
    );
    const obj = { fbData: hintFBArray, input: inputArray };
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    uploadBytes(storageRef, blob).then(() => {
      alert("アップロード完了しました！");
      handleClose();
    });
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
              <Button onClick={handleClickOpen} style={buttonStyle}>
                保存して終了
              </Button>
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
        <DialogTitle id="alert-dialog-title">{"学習データの保存"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            学習データを保存して終了するには、あなたの名前を入力した後に「保存して終了」をクリックしてください。
          </DialogContentText>
          <TextField
            id="outlined-basic"
            placeholder="あなたの名前"
            variant="outlined"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            sx={{ width: "60%" }}
            error={error}
            helperText={helper}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            variant="contained"
            onClick={() => saveLearningData(userName)}
            autoFocus
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
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
