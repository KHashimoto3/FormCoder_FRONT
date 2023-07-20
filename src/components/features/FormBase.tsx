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
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Hint } from "./hint/Hint";
import { Form } from "./form/Form";
import { useState } from "react";

export const FormBase = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
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
            学習データを保存して終了するには「保存して終了」をクリックしてください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
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
