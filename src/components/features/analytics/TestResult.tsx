import { Box, Stack, Typography } from "@mui/material";
import { TestResultCard } from "./test-result-card/TestResultCard";

export const TestResult = () => {
  const sampleResultData = [
    {
      title: "基本テスト1",
      status: "正解",
      input: "1 2",
      output: "3",
      error: "",
    },
    {
      title: "基本テスト2",
      status: "正解",
      input: "2 3",
      output: "5",
      error: "",
    },
    {
      title: "エッジテスト1",
      status: "失敗",
      input: "3 4",
      output: "9",
      error: "違う出力結果",
    },
    {
      title: "エッジテスト2",
      status: "失敗",
      input: "9 1",
      output: "9",
      error: "違う出力結果",
    },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ color: "#ffffff", background: "#5F94D9" }}>
        正解状況・コンパイル結果
      </Typography>
      <Box
        width="90%"
        maxHeight="400px"
        sx={{ msOverflowY: "scroll", padding: "10px", overflowX: "hidden" }}
      >
        <Stack spacing={2}>
          {sampleResultData.map((data, index) => (
            <TestResultCard
              key={index}
              title={data.title}
              status={data.status}
              input={data.input}
              output={data.output}
              error={data.error}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};
