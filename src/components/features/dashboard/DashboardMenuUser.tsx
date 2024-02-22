import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";

type Props = {
  avatarImage: string;
};

export const DashboardMenuUser = (props: Props) => {
  const { avatarImage } = props;
  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Stack spacing={1} alignItems={"center"}>
        <Avatar sx={{ width: 100, height: 100 }} src={avatarImage} />
        <Typography variant="h5">ユーザー名</Typography>
      </Stack>
    </div>
  );
};
