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
import { useContext, useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { HintContext } from "./hint/HintProvider";
import { InputContext } from "./form/InputArrayProvider";

// Create a storage reference from our storage service

export const FormBase = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { hintFBArray } = useContext(HintContext);
  const { inputArray } = useContext(InputContext);

  //フォームの名前の入力欄
  const [userName, setUserName] = useState<string>("");

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const saveLearningData = (userName: string) => {
    const storageRef = ref(storage, "record/" + userName + ".json");
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
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
                フォーム名
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            variant="contained"
            onClick={() => saveLearningData(userName)}
            autoFocus
          >
            保存して終了
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ marginTop: "100px" }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Hint />
          </Grid>
          <Grid item xs={7}>
            <Form />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
