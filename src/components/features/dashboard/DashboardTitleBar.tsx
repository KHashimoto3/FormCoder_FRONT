import {
  Avatar,
  Badge,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { useUserData } from "../../common/hooks/useUserData";

export const DashboardTitleBar = () => {
  const { getUserData } = useUserData();
  const avatarImage = getUserData().icon;
  const userName = getUserData().name;

  return (
    <div
      style={{
        background: "#ffffff",
        height: "auto",
        borderBottom: "1px solid #dbdbdb",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={2} textAlign={"center"}>
          <Typography variant="h4">Form Coder</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">ダッシュボード</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton size="small" aria-label="your name" color="inherit">
            <Button size="small">
              <Avatar sx={{ width: 30, height: 30 }} src={avatarImage} />
              <Typography variant="body1" sx={{ color: "#000000" }}>
                {userName}
              </Typography>
            </Button>
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
