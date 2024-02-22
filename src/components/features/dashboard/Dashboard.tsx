import { Grid } from "@mui/material";
import { DashboardMenu } from "./DashboardMenu";
import { DashboardContent } from "./DashboardContent";
import { useState } from "react";
import { DashboardTitleBar } from "./DashboardTitleBar";

export const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("学習");

  const avatarImage = "https://picsum.photos/200";

  return (
    <div>
      <DashboardTitleBar avatarImage={avatarImage} />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <DashboardMenu
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            avatarImage={avatarImage}
          />
        </Grid>
        <Grid item xs={10}>
          <DashboardContent selectedMenu={selectedMenu} />
        </Grid>
      </Grid>
    </div>
  );
};
