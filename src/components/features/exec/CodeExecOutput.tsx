type Props = {
  resultStatus: string;
  output: string;
};

export const CodeExecOutput = (props: Props) => {
  const { resultStatus } = props;
  const { output } = props;
  return (
    <div>
      <p>resultStatus: {resultStatus}</p>
      <p>output: {output}</p>
    </div>
  );
};
