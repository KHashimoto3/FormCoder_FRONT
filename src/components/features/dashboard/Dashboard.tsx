import { Grid } from "@mui/material";
import { DashboardMenu } from "./DashboardMenu";
import { DashboardContent } from "./DashboardContent";
import { useEffect, useState } from "react";
import { DashboardTitleBar } from "./DashboardTitleBar";

import { useUserData } from "../../common/hooks/useUserData";
import { DashboardFooter } from "./DashboardFooter";

export const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("学習");

  const { getUserData } = useUserData();

  useEffect(() => {
    const userData = getUserData();
    if (userData.userId === undefined) {
      window.location.href = "/login";
    }
  }, []);

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
      <DashboardFooter />
    </div>
  );
};
