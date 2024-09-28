import { Box, Container, Grid, Stack, Typography } from "@mui/material";

export const General = () => {
  return (
    <div>
      <Typography variant="h6">総合分析</Typography>
      <Container maxWidth="md">
        <Box sx={{ border: 1, borderRadius: 1, borderColor: "grey.500", p: 1 }}>
          <Stack spacing={2}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <Box textAlign={"center"}>
                  <Typography variant="h1" sx={{ color: "#4E9316" }}>
                    81<span style={{ fontSize: "16pt" }}>点</span>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    background: "#FFDAC5",
                    borderRadius: 1,
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6">取り組み時間：13位</Typography>
                  <Typography variant="h6">打鍵速度：21位</Typography>
                  <Typography variant="h6">ミスのなさ：14位</Typography>
                </Box>
              </Grid>
            </Grid>
            <hr />
            <div>
              <Box textAlign={"center"}>
                <Typography variant="h6">
                  入力のミスが減ってきましたね！その調子です
                </Typography>
              </Box>
            </div>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};
