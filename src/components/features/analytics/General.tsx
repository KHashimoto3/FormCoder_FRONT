import { Box, Container, Grid, Stack, Typography } from "@mui/material";

type Props = {
  score: number;
  rank: {
    time: number;
    speed: number;
    accuracy: number;
  };
  comment: string;
};

export const General = (props: Props) => {
  const { score, rank, comment } = props;
  return (
    <div>
      <Typography variant="h6" sx={{ color: "#ffffff", background: "#D96D5F" }}>
        総合分析
      </Typography>
      <Container maxWidth="md">
        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "grey.500",
            p: 1,
            marginTop: "20px",
          }}
        >
          <Stack spacing={2}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <Box textAlign={"center"}>
                  <Typography
                    variant="h1"
                    sx={{
                      color: score >= 60 ? "#4E9316" : "#d16b52",
                      fontWeight: "bold",
                    }}
                  >
                    {score}
                    <span style={{ fontSize: "16pt" }}>点</span>
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
                  <Typography variant="h6">
                    取り組み時間：{rank.time}位
                  </Typography>
                  <Typography variant="h6">打鍵速度：{rank.speed}位</Typography>
                  <Typography variant="h6">
                    ミスのなさ：{rank.accuracy}位
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <hr />
            <div>
              <Box textAlign={"center"}>
                <Typography variant="h6">{comment}</Typography>
              </Box>
            </div>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};
