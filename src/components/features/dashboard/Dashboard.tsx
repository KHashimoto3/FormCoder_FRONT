import { Grid } from "@mui/material";
import { DashboardMenu } from "./DashboardMenu";
import { DashboardContent } from "./DashboardContent";
import { useState } from "react";
import { DashboardTitleBar } from "./DashboardTitleBar";

export const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("学習");

  return (
    <div>
      <DashboardTitleBar />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <DashboardMenu
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        </Grid>
        <Grid item xs={10}>
          <DashboardContent selectedMenu={selectedMenu} />
        </Grid>
      </Grid>
    </div>
  );
};
