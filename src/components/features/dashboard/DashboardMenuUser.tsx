import { Avatar, Stack, Typography } from "@mui/material";

import { useUserData } from "../../common/hooks/useUserData";

export const DashboardMenuUser = () => {
  const { getUserData } = useUserData();

  const avatarImage = getUserData().icon;
  const userName = getUserData().name;

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Stack spacing={1} alignItems={"center"}>
        <Avatar sx={{ width: 100, height: 100 }} src={avatarImage} />
        <Typography variant="h5">{userName}</Typography>
      </Stack>
    </div>
  );
};
