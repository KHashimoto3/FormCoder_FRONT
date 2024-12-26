import { Box, Stack, Typography } from "@mui/material";
import { TestResultCard } from "./test-result-card/TestResultCard";

type Props = {
  resultData: {
    title: string;
    status: string;
    input: string;
    output: string;
    error: string;
  }[];
};

export const TestResult = (props: Props) => {
  const resultData = props.resultData;

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
          {resultData.map((data, index) => (
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
