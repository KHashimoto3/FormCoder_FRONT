import { Container } from "@mui/material";

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
        <p>＜コード＞</p>
        <textarea
          rows={10}
          cols={45}
          style={{ fontSize: "18pt", borderRadius: "10px" }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <p>＜入力＞</p>
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
