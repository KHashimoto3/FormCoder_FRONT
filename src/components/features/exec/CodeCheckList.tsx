import { Box, Button, Container, Typography } from "@mui/material";
import { CheckResult } from "./CheckResult";
import { ErrorResolve } from "../../types/errorResolve";
import { CheckMissResult } from "../../types/checkMissResult";

type Props = {
  checkCode: () => void;
  checkButtonDisabled: boolean;
  errorResolveList: ErrorResolve[];
  foundMissList: CheckMissResult[];
};

export const CodeCheckList = (props: Props) => {
  const { checkCode } = props;
  const { checkButtonDisabled } = props;
  const { errorResolveList } = props;
  const { foundMissList } = props;
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h6" sx={{ mt: 2 }}>
          ＜実行結果＞
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            borderRadius: "10px",
            border: "1px solid black",
            padding: "10px",
            height: "400px",
            overflow: "scroll",
          }}
        >
          <CheckResult
            errorResolveList={errorResolveList}
            foundMissList={foundMissList}
          />
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
