import { Box, Grid, Typography } from "@mui/material";

export const Top = () => {
  const backgroundStyle = {
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(201,227,249,1) 100%)",
  };

  return (
    <Box sx={{ height: "500px" }} style={backgroundStyle}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ textAlign: "center", paddingTop: "200px" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              フォームを使ったプログラミング学習
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: "center", paddingTop: "200px" }}>
            <h1>左側</h1>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
