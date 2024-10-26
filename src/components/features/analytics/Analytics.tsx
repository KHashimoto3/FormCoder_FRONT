import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Graph } from "./Graph";
import { ReviewAdovice } from "./ReviewAdvice";
import { General } from "./General";
import { TestResult } from "./TestResult";

import { useUserData } from "../../common/hooks/useUserData";
import { useEffect, useState } from "react";

export const Analytics = () => {
  const { getUserData } = useUserData();
  const [userId, setUserId] = useState<string>("");

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const jumpToLearning = () => {
    const path = "/dashboard/" + userId;
    location.href = path;
  };

  const shareAnalytics = () => {
    //現在のページのURLを取得し、クリップボードにコピーする
    const url = location.href;
    navigator.clipboard.writeText(url);
    alert("このページのURLをコピーしました！");
  };

  useEffect(() => {
    const userData = getUserData();
    if (userData.userId !== undefined) {
      setUserId(userData.userId);
    }
  }, []);

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          background: "#fff",
          borderRadius: "10px",
          position: "fixed",
          marginTop: "-10px",
          zIndex: "1000",
        }}
      >
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
                総合分析結果
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 0.03,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Stack spacing={1} direction="row">
                <Button
                  onClick={shareAnalytics}
                  color="primary"
                  variant="outlined"
                >
                  結果をシェア
                </Button>
                <Button onClick={jumpToLearning} style={buttonStyle}>
                  終了する
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
      <div>
        <Box sx={{ paddingTop: "80px" }}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item xs={6}>
                  <Graph />
                </Grid>
                <Grid item xs={6}>
                  <ReviewAdovice />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item xs={6}>
                  <General />
                </Grid>
                <Grid item xs={6}>
                  <TestResult />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
