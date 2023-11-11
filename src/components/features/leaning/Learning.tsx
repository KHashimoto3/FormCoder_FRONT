import { Box, Button, Grid, Typography } from "@mui/material";
import { FormCard } from "./FormCard";

export const Learning = () => {
  return (
    <Box sx={{ height: "1000px", paddingTop: "160px" }}>
      <Typography variant="h4" component="div" gutterBottom>
        すべてのフォーム
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <FormCard />
        </Grid>
        <Grid item xs={3}>
          <FormCard />
        </Grid>
        <Grid item xs={3}>
          <FormCard />
        </Grid>
        <Grid item xs={3}>
          <FormCard />
        </Grid>
      </Grid>
      <Button
        size="large"
        onClick={() => {
          window.open("/form?form=experiment1", "_blank");
        }}
      >
        実験用フォーム1
      </Button>
      <Button
        size="large"
        onClick={() => {
          window.open("/form?form=experiment2", "_blank");
        }}
      >
        実験用フォーム2
      </Button>
    </Box>
  );
};
