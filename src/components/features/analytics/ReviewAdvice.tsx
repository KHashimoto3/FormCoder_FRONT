import { Typography, Stack, Box } from "@mui/material";
import { ReviewCard } from "./review-card/ReviewCard";

type Props = {
  reviewList: {
    title: string;
    description: string;
  }[];
};

export const ReviewAdovice = (props: Props) => {
  const reviewData = props.reviewList;

  const onClickHandler = () => {
    alert("まだ解説ページはありません。");
  };

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
          {reviewData.map((data, index) => (
            <ReviewCard
              key={index}
              title={data.title}
              description={data.description}
              onClick={onClickHandler}
            />
          ))}
        </Stack>
      </Box>
    </div>
  );
};
