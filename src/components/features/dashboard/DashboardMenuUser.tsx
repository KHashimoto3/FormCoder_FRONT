import { Avatar, Grid, Typography } from "@mui/material";

export const DashboardMenuUser = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Avatar>N</Avatar>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5">ユーザー名</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
