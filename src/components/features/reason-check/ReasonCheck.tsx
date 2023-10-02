import { ErrorReason } from "./ErrorReason";
import { DifferenceReason } from "./DifferenceReason";
import { Typography } from "@mui/material";

export const ReasonCheck = () => {
  return (
    <>
      <Typography variant="h4">原因チェックページです。</Typography>
      <Typography variant="body1">
        以下のチェック項目を元に、エラーや間違いを解消してみましょう！
      </Typography>
      <div>
        <Typography
          variant="h5"
          sx={{ background: "#3279a8", color: "#ffffff" }}
        >
          エラーが発生する場合
        </Typography>
        <ErrorReason />
      </div>
      <div style={{ marginTop: "30px" }}>
        <Typography
          variant="h5"
          sx={{ background: "#3279a8", color: "#ffffff" }}
        >
          実行結果が違う場合
        </Typography>
        <DifferenceReason />
      </div>
    </>
  );
};
