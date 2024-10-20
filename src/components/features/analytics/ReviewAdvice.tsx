import { Typography, Grid, Stack, Box } from "@mui/material";
import { ReviewCard } from "./review-card/ReviewCard";

export const ReviewAdovice = () => {
  const sampleReviewData = [
    {
      title: "復習すべき単元1",
      description:
        "説明1、説明1、説明1、説明1、説明1、説明1、説明1、説明1、説明1、説明1、",
    },
    {
      title: "復習すべき単元2",
      description:
        "説明2、説明2、説明2、説明2、説明2、説明2、説明2、説明2、説明2、説明2、",
    },
    {
      title: "復習すべき単元3",
      description:
        "説明3、説明3、説明3、説明3、説明3、説明3、説明3、説明3、説明3、説明3、",
    },
  ];

  return (
    <div>
      <Typography variant="h6" sx={{ color: "#ffffff", background: "#5F94D9" }}>
        復習アドバイス
      </Typography>
      <Typography>
        今回の学習結果から、あなたが学習すべき単元を提案します。
      </Typography>
      <Box
        width="80%"
        maxWidth="700px"
        height="auto"
        sx={{ overflowX: "scroll", padding: "10px", overflowY: "hidden" }}
      >
        <Stack spacing={2} direction="row">
          {sampleReviewData.map((data, index) => (
            <ReviewCard
              key={index}
              title={data.title}
              description={data.description}
            />
          ))}
        </Stack>
      </Box>
    </div>
  );
};
