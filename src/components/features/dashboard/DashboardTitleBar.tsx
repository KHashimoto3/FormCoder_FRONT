import {
  Avatar,
  Badge,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

type Props = {
  avatarImage: string;
};

export const DashboardTitleBar = (props: Props) => {
  const { avatarImage } = props;
  return (
    <div
      style={{
        background: "#ffffff",
        height: "10%",
        borderBottom: "0.5px solid #000000",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Typography variant="h4">FormCoder Dashboard</Typography>
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
                ユーザー名
              </Typography>
            </Button>
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};
