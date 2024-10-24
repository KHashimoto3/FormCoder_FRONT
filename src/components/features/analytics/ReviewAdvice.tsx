import { Typography, Stack, Box } from "@mui/material";
import { ReviewCard } from "./review-card/ReviewCard";

export const ReviewAdovice = () => {
  const sampleReviewData = [
    {
      title: "繰り返し（for）",
      description:
        "for文の基本を復習します。配列の要素を一つずつ取り出す方法を確認してください。",
    },
    {
      title: "関数",
      description:
        "関数の作り方と使い方を復習します。引数や戻り値についても思い出してください。",
    },
    {
      title: "文字列処理",
      description:
        "文字列を扱う方法を復習します。文字列の長さを調べたり、特定の文字を見つける方法を確認してください。",
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
