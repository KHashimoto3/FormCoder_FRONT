import { Box, Button, Container, Typography } from "@mui/material";
import { CheckResult } from "./CheckResult";
import { ErrorResolve } from "../../types/errorResolve";
import { CheckMissResult } from "../../types/checkMissResult";
import { CodeExecOutput } from "./CodeExecOutput";

type Props = {
  checkCode: () => void;
  checkButtonDisabled: boolean;
  errorResolveList: ErrorResolve[];
  foundMissList: CheckMissResult[];
  resultStatus: string;
  output: string;
};

export const CodeCheckList = (props: Props) => {
  const { checkCode } = props;
  const { checkButtonDisabled } = props;
  const { errorResolveList } = props;
  const { foundMissList } = props;
  const { resultStatus } = props;
  const { output } = props;
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h6" sx={{ mt: 2 }}>
          ＜エラーチェック＞
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            borderRadius: "10px",
            border: "1px solid black",
            padding: "10px",
            height: "300px",
            overflow: "scroll",
          }}
        >
          <CheckResult
            errorResolveList={errorResolveList}
            foundMissList={foundMissList}
          />
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>
          ＜出力＞
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            borderRadius: "10px",
            border: "1px solid black",
            padding: "10px",
            height: "100px",
            overflow: "scroll",
          }}
        >
          <CodeExecOutput resultStatus={resultStatus} output={output} />
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={checkCode}
          disabled={checkButtonDisabled}
        >
          チェックする
        </Button>
      </Container>
    </>
  );
};
