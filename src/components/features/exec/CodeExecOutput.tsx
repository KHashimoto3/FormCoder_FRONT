import { ExecStatus } from "./execStatus";

type Props = {
  resultStatus: string;
  output: string;
};

export const CodeExecOutput = (props: Props) => {
  const { resultStatus } = props;
  const { output } = props;

  const consoleText =
    resultStatus === "Ready"
      ? "$ form-coder info \n\nまだ実行されていません。「チェックする」ボタンを押すと、出力を確認できます。\n\n$"
      : "$ gcc -o main main.c\n$ ./main\n\n" + output + "\n$";

  const messageColor = resultStatus === "error" ? "red" : "white";

  return (
    <div>
      <ExecStatus status={resultStatus} />
      <textarea
        readOnly
        rows={4}
        value={consoleText}
        style={{
          width: "100%",
          height: "auto",
          background: "#2e2e2e",
          border: "none",
          color: messageColor,
        }}
      />
    </div>
  );
};
