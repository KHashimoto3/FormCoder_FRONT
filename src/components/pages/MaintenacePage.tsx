import { Box, Card, CardContent, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export const MaintenancePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          padding: 3,
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <ConstructionIcon sx={{ fontSize: 50, color: "#f57c00", mr: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
            メンテナンス中
          </Typography>
          <Typography variant="body1" gutterBottom>
            Form Coder システムをご利用いただきありがとうございます。
          </Typography>
          <Typography variant="body1" gutterBottom>
            現在、システムのメンテナンスを行っております。
          </Typography>
          <Typography variant="body1" gutterBottom>
            ご不便をおかけいたしますが、しばらくお待ちください。
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, fontWeight: "bold" }}>
            復旧予定時刻: 未定です。決まりましたらお知らせ致します。
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
