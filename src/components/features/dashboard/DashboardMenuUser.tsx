import { Avatar, Grid, Typography } from "@mui/material";

type Props = {
  avatarImage: string;
};

export const DashboardMenuUser = (props: Props) => {
  const { avatarImage } = props;
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Avatar src={avatarImage} />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5">ユーザー名</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
