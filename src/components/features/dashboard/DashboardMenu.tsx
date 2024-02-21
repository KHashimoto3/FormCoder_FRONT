import { Button, Stack } from "@mui/material";

export const DashboardMenu = () => {
  return (
    <div style={{ height: "100%" }}>
      <Stack spacing={1}>
        <Button variant="text">学習</Button>
        <Button variant="text">編集</Button>
        <Button variant="text">学習履歴</Button>
        <Button variant="text">設定</Button>
      </Stack>
    </div>
  );
};
