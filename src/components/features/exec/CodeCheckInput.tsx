import { cppLanguage } from "@codemirror/lang-cpp";
import { Container, Typography } from "@mui/material";
import ReactCodeMirror from "@uiw/react-codemirror";

type Props = {
  code: string;
  setCode: (code: string) => void;
  codeInput: string;
  setCodeInput: (input: string) => void;
};

export const CodeCheckInput = (props: Props) => {
  const { code, setCode } = props;
  const { codeInput, setCodeInput } = props;
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h6" sx={{ mt: 2 }}>
          ＜コード＞
        </Typography>
        <ReactCodeMirror value={code} extensions={[cppLanguage]} />
        <textarea
          rows={10}
          cols={45}
          style={{ fontSize: "18pt", borderRadius: "10px" }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          ＜入力＞
        </Typography>
        <textarea
          rows={4}
          cols={45}
          style={{ fontSize: "18pt", borderRadius: "10px" }}
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
        />
      </Container>
    </>
  );
};
