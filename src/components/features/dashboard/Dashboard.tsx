import { Grid } from "@mui/material";
import { DashboardMenu } from "./DashboardMenu";
import { DashboardContent } from "./DashboardContent";

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <DashboardMenu />
        </Grid>
        <Grid item xs={10}>
          <DashboardContent />
        </Grid>
      </Grid>
    </div>
  );
};
