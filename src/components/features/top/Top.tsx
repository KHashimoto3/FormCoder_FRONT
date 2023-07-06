import { Box, Grid } from "@mui/material";

export const Top = () => {
  return (
    <Box sx={{ height: "500px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ background: "#c4dbff" }}>
          <h1>左側</h1>
        </Grid>
        <Grid item xs={6} sx={{ background: "#ffc4fa" }}>
          <h1>右側</h1>
        </Grid>
      </Grid>
    </Box>
  );
};
