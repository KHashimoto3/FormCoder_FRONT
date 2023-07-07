import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useHistory } from "react-router-dom";

export const Top = () => {
  const history = useHistory();

  const backgroundStyle = {
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(236,246,255,1) 100%)",
  };

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  return (
    <Box sx={{ height: "1000px" }} style={backgroundStyle}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ textAlign: "center", paddingTop: "200px" }}>
            <Stack spacing={3}>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                フォームを使ったプログラミング学習
              </Typography>
              <Box>
                <Button
                  style={buttonStyle}
                  size="large"
                  onClick={() => {
                    history.push("/form");
                  }}
                >
                  <PlayCircleOutlineIcon />
                  サンプルフォームを見る
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: "center", paddingTop: "200px" }}>
            <h1>イメージ画像</h1>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
