import { Typography } from "@mui/material";

export const Question = () => {
  const questionTitle = "Even or Odd（サンプル）";
  const questionInstruction =
    "与えられた数値が、偶数か奇数かを判定する関数を作成してください。偶数の場合はEven、奇数の場合はOddを返してください。";
  const inputExample = "2";
  const outputExample = "Even";
  return (
    <div>
      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        {questionTitle}
      </Typography>
      <div style={{ background: "#ededed" }}>
        <Typography variant="h5" gutterBottom>
          問題:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {questionInstruction}
        </Typography>
      </div>
      <Typography variant="h5" gutterBottom>
        入力例:
      </Typography>
      <textarea
        rows={4}
        cols={20}
        value={inputExample}
        style={{ fontSize: "16pt" }}
      />
      <Typography variant="h5" gutterBottom>
        出力例:
      </Typography>
      <textarea
        rows={4}
        cols={20}
        value={outputExample}
        style={{ fontSize: "16pt" }}
      />
    </div>
  );
};
